import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useGetBalance } from './use-get-balance';

export function SolanaGetBalance({ publicKey }: { publicKey: PublicKey }) {
  const query = useGetBalance({ publicKey });

  return (
    <span>
      {query.isLoading && <span>Loading...</span>}
      {query.isError && <span>Error: {query.error?.message.toString()}</span>}
      {query.isSuccess && (
        <span>{(query.data ?? 0) / LAMPORTS_PER_SOL} SOL</span>
      )}
    </span>
  );
}
