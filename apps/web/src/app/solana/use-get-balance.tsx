import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

export function useGetBalance({ publicKey }: { publicKey: PublicKey }) {
  const { connection } = useConnection();
  return useQuery({
    queryKey: [
      'version',
      { endpoint: connection.rpcEndpoint, publicKey: publicKey.toString() },
    ],
    queryFn: () => connection.getBalance(publicKey),
    retry: false,
  });
}
