import { createTransferCheckedInstruction } from '@solana/spl-token';
import {
  Connection,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from '@solana/web3.js';
import { UiExplorerLink } from '../ui/ui-explorer/ui-explorer-link';
import { notifyError, notifySuccess } from '../ui/ui-notify/ui-notify';
import { ellipsify } from './ellipsify';
import { getPublicKey, PublicKeyString } from './get-public-key';

export async function sendTokenTransaction({
  accountData,
  account,
  destination,
  amount,
  connection,
  sendTransaction,
  tokenProgramId,
}: {
  account: PublicKeyString;
  accountData: {
    info: {
      mint: string;
      owner: string;
      tokenAmount: { decimals: number };
    };
  };
  accountOwner: PublicKeyString;
  destination: PublicKeyString;
  amount: number;
  connection: Connection;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<TransactionSignature>;
  tokenProgramId: PublicKeyString;
}) {
  let signature: TransactionSignature;
  const {
    mint,
    owner: accountOwner,
    tokenAmount: { decimals },
  } = accountData.info;
  try {
    const getTargetTokenAccount =
      await connection.getParsedTokenAccountsByOwner(
        getPublicKey(destination),
        {
          mint: getPublicKey(mint),
        }
      );

    const firstAccount = getTargetTokenAccount.value.find(
      (item) => item.account.data.parsed.info.mint === mint.toString()
    );

    if (!firstAccount) {
      console.log('firstAccount', firstAccount);
      notifyError({
        title: `Transaction failed!`,
        message: 'No account found for this token.',
      });
      return;
    }

    const realAmount = amount * Math.pow(10, decimals);

    // Create instructions to send, in this case a simple transfer
    const instructions = [
      createTransferCheckedInstruction(
        getPublicKey(account),
        getPublicKey(mint),
        firstAccount.pubkey,
        getPublicKey(accountOwner),
        realAmount,
        decimals,
        [],
        getPublicKey(tokenProgramId)
      ),
    ];

    // Get the lates block hash to use on our transaction and confirmation
    const latestBlockhash = await connection.getLatestBlockhash();

    // Create a new TransactionMessage with version and compile it to legacy
    const messageLegacy = new TransactionMessage({
      payerKey: getPublicKey(accountOwner),
      recentBlockhash: latestBlockhash.blockhash,
      instructions,
    }).compileToLegacyMessage();

    // Create a new VersionedTransaction which supports legacy and v0
    const transaction = new VersionedTransaction(messageLegacy);

    // Send transaction and await for signature
    signature = await sendTransaction(transaction, connection);
    console.log(signature);

    // Send transaction and await for signature
    await connection.confirmTransaction(
      { signature, ...latestBlockhash },
      'confirmed'
    );

    console.log(signature);
    notifySuccess({
      message: (
        <UiExplorerLink label={ellipsify(signature)} path={`tx/${signature}`}>
          Sent {amount} tokens to {ellipsify(destination.toString())}.
        </UiExplorerLink>
      ),
    });

    return signature;
  } catch (error: unknown) {
    console.log('error', `Transaction failed! ${error}`);
    notifyError({
      title: `Transaction failed!`,
      message: error?.toString(),
    });
    return;
  }
}
