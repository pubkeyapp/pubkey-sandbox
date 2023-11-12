import { Flex, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { useCluster } from '../cluster/cluster-provider';
import { SolanaGetVersion } from './solana-get-version';

export function SolanaClusterVersion({ children }: { children?: ReactNode }) {
  const { cluster } = useCluster();
  return (
    <Flex px="md" py="xs" justify="space-between" align="center">
      <Stack gap={0}>
        <Text fw="bold">{cluster.name}</Text>
        <Text size="xs" c="dimmed">
          {cluster.endpoint}
        </Text>
      </Stack>
      {children}
      <SolanaGetVersion />
    </Flex>
  );
}
