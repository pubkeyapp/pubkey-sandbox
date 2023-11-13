import { Connection, PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

export function useGetTokenBalance({
  connection,
  account,
}: {
  connection: Connection;
  account: PublicKey;
}) {
  return useQuery({
    queryKey: [
      'getTokenAccountBalance',
      { endpoint: connection.rpcEndpoint, account: account.toString() },
    ],
    queryFn: () => connection.getTokenAccountBalance(account),
  });
}
