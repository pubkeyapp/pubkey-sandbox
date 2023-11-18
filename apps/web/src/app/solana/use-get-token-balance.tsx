import { Connection } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { getPublicKey, PublicKeyString } from './get-public-key';

export function useGetTokenBalance({
  connection,
  account,
}: {
  connection: Connection;
  account: PublicKeyString;
}) {
  return useQuery({
    queryKey: [
      'getTokenAccountBalance',
      { endpoint: connection.rpcEndpoint, account: account.toString() },
    ],
    queryFn: () => connection.getTokenAccountBalance(getPublicKey(account)),
  });
}
