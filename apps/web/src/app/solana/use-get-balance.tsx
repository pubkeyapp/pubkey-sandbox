import { Connection, PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

export function useGetBalance({
  connection,
  publicKey,
}: {
  connection: Connection;
  publicKey: PublicKey;
}) {
  return useQuery({
    queryKey: [
      'getBalance',
      { endpoint: connection.rpcEndpoint, publicKey: publicKey.toString() },
    ],
    queryFn: () => connection.getBalance(publicKey),
  });
}
