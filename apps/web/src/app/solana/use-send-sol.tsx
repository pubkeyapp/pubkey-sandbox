import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { sendSolTransaction } from './send-sol-transaction';

export function useSendSol({ publicKey }: { publicKey: PublicKey }) {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  return useMutation({
    mutationKey: ['send-sol'],
    mutationFn: async ({
      destination,
      amount,
    }: {
      amount: number;
      destination: PublicKey;
    }) => {
      if (!publicKey) {
        console.log('error', `Send Transaction: Wallet not connected!`);
        return;
      }
      return sendSolTransaction({
        publicKey,
        destination,
        amount,
        connection,
        sendTransaction,
      });
    },
    retry: false,
  });
}
