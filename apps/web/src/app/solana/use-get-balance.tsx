import { Connection } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { getPublicKey, PublicKeyString } from './get-public-key';

export function useGetBalance({
  connection,
  publicKey,
}: {
  connection: Connection;
  publicKey: PublicKeyString;
}) {
  return useQuery({
    queryKey: [
      'getBalance',
      { endpoint: connection.rpcEndpoint, publicKey: publicKey.toString() },
    ],
    queryFn: () => connection.getBalance(getPublicKey(publicKey)),
  });
}
