import { useConnection } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { getPublicKey, PublicKeyString } from './get-public-key';

export function useGetTransactionHistory({
  publicKey,
}: {
  publicKey: PublicKeyString;
}) {
  const { connection } = useConnection();
  return useQuery({
    queryKey: [
      'transaction-history',
      { endpoint: connection.rpcEndpoint, publicKey: publicKey.toString() },
    ],
    queryFn: () =>
      connection.getConfirmedSignaturesForAddress2(getPublicKey(publicKey)),
  });
}
