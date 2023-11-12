import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

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
        new PublicKey(destination),
        amount * LAMPORTS_PER_SOL
      ),
  });
}
