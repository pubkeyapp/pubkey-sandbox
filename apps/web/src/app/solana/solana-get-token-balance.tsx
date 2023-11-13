import { Connection, PublicKey } from '@solana/web3.js';
import { useGetTokenBalance } from './use-get-token-balance';

export function SolanaGetTokenBalance({
  connection,
  account,
}: {
  connection: Connection;
  account: PublicKey;
}) {
  const query = useGetTokenBalance({ connection, account });

  return (
    <span
      onClick={() => query.refetch()}
      style={{
        cursor: 'pointer',
      }}
    >
      {query.isLoading && <span>Loading...</span>}
      {query.isError && <span>Error: {query.error?.message.toString()}</span>}
      {query.isSuccess && <span>{query.data.value.uiAmount}</span>}
    </span>
  );
}
