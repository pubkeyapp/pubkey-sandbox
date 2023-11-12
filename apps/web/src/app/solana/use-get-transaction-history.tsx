import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

export function useGetTransactionHistory({
  publicKey,
}: {
  publicKey: PublicKey;
}) {
  const { connection } = useConnection();
  return useQuery({
    queryKey: [
      'transaction-history',
      { endpoint: connection.rpcEndpoint, publicKey: publicKey.toString() },
    ],
    queryFn: () => connection.getConfirmedSignaturesForAddress2(publicKey),
  });
}
