import { Stack, Text } from '@mantine/core';
import { useGetVersion } from './use-get-version';

export function SolanaGetVersion() {
  const query = useGetVersion();

  return (
    <div>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error: {query.error?.message.toString()}</div>}
      {query.isSuccess && (
        <Stack gap={0} ta={'right'}>
          <Text fw="bold">Version: {query.data['solana-core']}</Text>
          <Text size="xs" c="dimmed">
            Features: {query.data['feature-set']}
          </Text>
        </Stack>
      )}
    </div>
  );
}
