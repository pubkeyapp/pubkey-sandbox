import { Card, Stack, Title } from '@mantine/core';
import { useGetVersion } from './use-get-version';

export function SolanaGetVersion() {
  const query = useGetVersion();

  return (
    <Card>
      <Stack>
        <Title order={3}>Solana Version</Title>
        {query.isLoading && <div>Loading...</div>}
        {query.isError && <div>Error: {query.error?.message.toString()}</div>}
        {query.isSuccess && (
          <div>
            Version: {query.data['solana-core']} features:{' '}
            {query.data['feature-set']}
          </div>
        )}
      </Stack>
    </Card>
  );
}
