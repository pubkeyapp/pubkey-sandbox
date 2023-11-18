import { Connection, VersionedTransaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { PublicKeyString } from './get-public-key';

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
  account: PublicKeyString;
  accountData: {
    info: {
      mint: string;
      owner: string;
      tokenAmount: { decimals: number };
    };
  };
  accountOwner: PublicKeyString;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<string>;
  tokenProgramId: PublicKeyString;
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
        account,
        accountData,
        accountOwner,
        destination,
        amount,
        connection,
        sendTransaction,
        tokenProgramId,
      }),
  });
}
