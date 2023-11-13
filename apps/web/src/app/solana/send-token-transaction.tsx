import { createTransferCheckedInstruction } from '@solana/spl-token';
import {
  Connection,
  PublicKey,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from '@solana/web3.js';
import { UiExplorerLink } from '../ui/ui-explorer/ui-explorer-link';
import { notifyError, notifySuccess } from '../ui/ui-notify/ui-notify';
import { ellipsify } from './ellipsify';

export async function sendTokenTransaction({
  accountData,
  account,
  destination,
  amount,
  connection,
  sendTransaction,
  tokenProgramId,
}: {
  account: PublicKey;
  accountData: {
    info: {
      mint: string;
      owner: string;
      tokenAmount: { decimals: number };
    };
  };
  accountOwner: PublicKey;
  destination: PublicKey;
  amount: number;
  connection: Connection;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<TransactionSignature>;
  tokenProgramId: PublicKey;
}) {
  let signature: TransactionSignature;
  const {
    mint,
    owner: accountOwner,
    tokenAmount: { decimals },
  } = accountData.info;
  try {
    const getTargetTokenAccount =
      await connection.getParsedTokenAccountsByOwner(destination, {
        mint: new PublicKey(mint),
      });

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
        account,
        new PublicKey(mint),
        firstAccount.pubkey,
        new PublicKey(accountOwner),
        realAmount,
        decimals,
        [],
        tokenProgramId
      ),
    ];

    // Get the lates block hash to use on our transaction and confirmation
    const latestBlockhash = await connection.getLatestBlockhash();

    // Create a new TransactionMessage with version and compile it to legacy
    const messageLegacy = new TransactionMessage({
      payerKey: new PublicKey(accountOwner),
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
          Sent {amount} tokens to {ellipsify(destination.toBase58())}.
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
