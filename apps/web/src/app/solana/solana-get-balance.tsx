import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PublicKeyString } from './get-public-key';
import { useGetBalance } from './use-get-balance';

export function SolanaGetBalance({
  connection,
  publicKey,
}: {
  connection: Connection;
  publicKey: PublicKeyString;
}) {
  const query = useGetBalance({ connection, publicKey });

  return (
    <span
      onClick={() => query.refetch()}
      style={{
        cursor: 'pointer',
      }}
    >
      {query.isLoading && <span>Loading...</span>}
      {query.isError && <span>Error: {query.error?.message.toString()}</span>}
      {query.isSuccess && (
        <span>{(query.data ?? 0) / LAMPORTS_PER_SOL} SOL</span>
      )}
    </span>
  );
}
