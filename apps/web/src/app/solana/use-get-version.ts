import { useConnection } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';

export function useGetVersion() {
  const { connection } = useConnection();
  return useQuery({
    queryKey: ['version', connection.rpcEndpoint],
    queryFn: () => connection.getVersion(),
    retry: false,
  });
}
