import { Card, Stack, Title } from '@mantine/core';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useGetBalance } from './use-get-balance';

export function SolanaGetBalance({ publicKey }: { publicKey: PublicKey }) {
  const query = useGetBalance({ publicKey });

  return (
    <Card>
      <Stack>
        <Title order={3}>Get Balance</Title>
        {query.isLoading && <div>Loading...</div>}
        {query.isError && <div>Error: {query.error?.message.toString()}</div>}
        {query.isSuccess && (
          <div>Balance: {(query.data ?? 0) / LAMPORTS_PER_SOL} SOL</div>
        )}
      </Stack>
    </Card>
  );
}
