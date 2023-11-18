import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { getPublicKey } from './get-public-key';

export function useRequestAirdrop({ connection }: { connection: Connection }) {
  return useMutation({
    mutationKey: ['request-airdrop'],
    mutationFn: async ({
      destination,
      amount,
    }: {
      amount: number;
      destination: string;
    }) =>
      connection.requestAirdrop(
        getPublicKey(destination),
        amount * LAMPORTS_PER_SOL
      ),
  });
}
