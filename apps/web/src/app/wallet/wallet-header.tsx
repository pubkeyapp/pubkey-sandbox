import { Flex, Group, Stack, Text } from '@mantine/core';
import { useConnection } from '@solana/wallet-adapter-react';
import { ellipsify } from '../solana/ellipsify';
import { PublicKeyString } from '../solana/get-public-key';
import { SolanaAirdropSol } from '../solana/solana-airdrop-sol';
import { SolanaGetBalance } from '../solana/solana-get-balance';
import { SolanaReceiveSolButton } from '../solana/solana-receive-sol-button';
import { SolanaSendSolButton } from '../solana/solana-send-sol-button';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';

export function WalletHeader({ publicKey }: { publicKey: PublicKeyString }) {
  const { connection } = useConnection();
  return (
    <Flex align="center" justify="space-between">
      <Stack gap={0}>
        <Text size="xl" fw="bold">
          <SolanaGetBalance connection={connection} publicKey={publicKey} />
        </Text>
        <Group gap={2}>
          <UiExplorer
            label={ellipsify(publicKey.toString())}
            path={`account/${publicKey}`}
            copyValue={publicKey.toString()}
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
