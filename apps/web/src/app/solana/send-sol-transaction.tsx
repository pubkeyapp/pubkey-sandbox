import { showNotification } from '@mantine/notifications';
import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from '@solana/web3.js';

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
        lamports: amount,
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
    showNotification({
      color: 'green',
      message: 'Transaction successful! ' + signature,
    });
    return signature;
  } catch (error: unknown) {
    showNotification({
      color: 'red',
      title: `Transaction failed!`,
      message: error?.toString(),
    });
    console.log('error', `Transaction failed! ${error}`, signature);
    return;
  }
}
