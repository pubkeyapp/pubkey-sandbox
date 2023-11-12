import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from '@solana/web3.js';
import { UiExplorerLink } from '../ui/ui-explorer/ui-explorer-link';
import { notifyError, notifySuccess } from '../ui/ui-notify/ui-notify';
import { ellipsify } from './ellipsify';

export async function sendSolTransaction({
  publicKey,
  destination,
  amount,
  connection,
  sendTransaction,
}: {
  publicKey: PublicKey;
  destination: PublicKey;
  amount: number;
  connection: Connection;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<TransactionSignature>;
}) {
  let signature: TransactionSignature = '';
  try {
    // Create instructions to send, in this case a simple transfer
    const instructions = [
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: destination,
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    ];

    // Get the lates block hash to use on our transaction and confirmation
    const latestBlockhash = await connection.getLatestBlockhash();

    // Create a new TransactionMessage with version and compile it to legacy
    const messageLegacy = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions,
    }).compileToLegacyMessage();

    // Create a new VersionedTransaction which supports legacy and v0
    const transaction = new VersionedTransaction(messageLegacy);

    // Send transaction and await for signature
    signature = await sendTransaction(transaction, connection);

    // Send transaction and await for signature
    await connection.confirmTransaction(
      { signature, ...latestBlockhash },
      'confirmed'
    );

    console.log(signature);
    notifySuccess({
      message: (
        <UiExplorerLink label={ellipsify(signature)} path={`tx/${signature}`}>
          Sent {amount} SOL to {ellipsify(destination.toBase58())}.
        </UiExplorerLink>
      ),
    });

    return signature;
  } catch (error: unknown) {
    console.log('error', `Transaction failed! ${error}`, signature);
    notifyError({
      title: `Transaction failed!`,
      message: error?.toString(),
    });
    return;
  }
}
