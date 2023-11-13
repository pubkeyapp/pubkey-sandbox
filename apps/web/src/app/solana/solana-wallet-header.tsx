import { Flex, Group, Stack, Text } from '@mantine/core';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';
import { ellipsify } from './ellipsify';
import { SolanaAirdropSol } from './solana-airdrop-sol';
import { SolanaGetBalance } from './solana-get-balance';
import { SolanaReceiveSolButton } from './solana-receive-sol-button';
import { SolanaSendSolButton } from './solana-send-sol-button';

export function SolanaWalletHeader({ publicKey }: { publicKey: PublicKey }) {
  const { connection } = useConnection();
  return (
    <Flex align="center" justify="space-between">
      <Stack gap={0}>
        <Text size="xl" fw="bold">
          <SolanaGetBalance connection={connection} publicKey={publicKey} />
        </Text>
        <Group gap={2}>
          <UiExplorer
            label={ellipsify(publicKey.toBase58())}
            path={`account/${publicKey}`}
            copyValue={publicKey.toBase58()}
            copyLabel="Copy address"
          />
        </Group>
      </Stack>
      <Group>
        <SolanaAirdropSol variant="light" publicKey={publicKey} />
        <SolanaSendSolButton variant="light" publicKey={publicKey} />
        <SolanaReceiveSolButton variant="light" publicKey={publicKey} />
      </Group>
    </Flex>
  );
}
