import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { sendSolTransaction } from './send-sol-transaction';

export function useTransferSol({
  connection,
  publicKey,
  sendTransaction,
}: {
  connection: Connection;
  publicKey: PublicKey;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<string>;
}) {
  return useMutation({
    mutationKey: ['send-sol'],
    mutationFn: async ({
      destination,
      amount,
    }: {
      amount: number;
      destination: string;
    }) =>
      sendSolTransaction({
        publicKey,
        destination: new PublicKey(destination),
        amount,
        connection,
        sendTransaction,
      }),
  });
}
