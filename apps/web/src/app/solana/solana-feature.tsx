import { Anchor, Card, Code, Flex, Stack, Text } from '@mantine/core';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@pubkeyapp/wallet-adapter-mantine-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCluster } from '../cluster/cluster-provider';
import { SolanaGetBalance } from './solana-get-balance';
import { SolanaGetVersion } from './solana-get-version';
import { SolanaSendSol } from './solana-send-sol';

export default function SolanaFeature() {
  const { cluster, getExplorerUrl } = useCluster();
  const { connected, publicKey } = useWallet();
  return (
    <Stack py="md">
      <Card>
        <Flex align="baseline" justify="space-between">
          <Text size="xl">{cluster.name}</Text>
          <Text c="dimmed">{cluster.endpoint}</Text>
        </Flex>
      </Card>
      <SolanaGetVersion />
      {connected && publicKey ? (
        <Stack>
          <Flex align="center" justify="space-between">
            <Anchor
              href={getExplorerUrl(`account/${publicKey}`)}
              target="_blank"
            >
              <Code>{publicKey.toString()}</Code>
            </Anchor>
            <WalletDisconnectButton />
          </Flex>
          <SolanaGetBalance publicKey={publicKey} />
          <SolanaSendSol publicKey={publicKey} />
        </Stack>
      ) : (
        <Flex align="center" justify="space-between">
          <Text size="lg">Connect to a wallet</Text>
          <WalletMultiButton />
        </Flex>
      )}
    </Stack>
  );
}
