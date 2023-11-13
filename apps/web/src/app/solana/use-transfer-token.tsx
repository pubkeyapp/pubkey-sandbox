import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { sendTokenTransaction } from './send-token-transaction';

export function useTransferToken({
  connection,
  account,
  accountData,
  accountOwner,
  sendTransaction,
  tokenProgramId,
}: {
  connection: Connection;
  account: PublicKey;
  accountData: {
    info: {
      mint: string;
      owner: string;
      tokenAmount: { decimals: number };
    };
  };
  accountOwner: PublicKey;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<string>;
  tokenProgramId: PublicKey;
}) {
  return useMutation({
    mutationKey: ['transfer-token'],
    mutationFn: async ({
      destination,
      amount,
    }: {
      amount: number;
      destination: string;
    }) =>
      sendTokenTransaction({
        account: new PublicKey(account.toString()),
        accountData,
        accountOwner: new PublicKey(accountOwner.toString()),
        destination: new PublicKey(destination),
        amount,
        connection,
        sendTransaction,
        tokenProgramId,
      }),
  });
}
