import { Connection, VersionedTransaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { PublicKeyString } from './get-public-key';
import { sendSolTransaction } from './send-sol-transaction';

export function useTransferSol({
  connection,
  publicKey,
  sendTransaction,
}: {
  connection: Connection;
  publicKey: PublicKeyString;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<string>;
}) {
  return useMutation({
    mutationKey: ['transfer-sol'],
    mutationFn: async ({
      destination,
      amount,
    }: {
      amount: number;
      destination: string;
    }) =>
      sendSolTransaction({
        publicKey,
        destination,
        amount,
        connection,
        sendTransaction,
      }),
  });
}
