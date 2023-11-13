import { Group, Stack, Title } from '@mantine/core';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';
import { UiHeroPage } from '../ui/ui-hero-page';
import { ellipsify } from './ellipsify';
import { SolanaAirdropSol } from './solana-airdrop-sol';
import { SolanaGetBalance } from './solana-get-balance';
import { SolanaReceiveSolButton } from './solana-receive-sol-button';
import { SolanaSendSolButton } from './solana-send-sol-button';

export function SolanaWalletHero({ publicKey }: { publicKey: PublicKey }) {
  const { connection } = useConnection();
  return (
    <UiHeroPage
      title={
        <Title order={1}>
          {<SolanaGetBalance connection={connection} publicKey={publicKey} />}
        </Title>
      }
      description={
        <Stack>
          <Group justify="center" mt="lg">
            <SolanaAirdropSol size="xs" variant="light" publicKey={publicKey} />
            <SolanaSendSolButton
              size="xs"
              variant="light"
              publicKey={publicKey}
            />
            <SolanaReceiveSolButton
              size="xs"
              variant="light"
              publicKey={publicKey}
            />
          </Group>
          <Group justify="center">
            <UiExplorer
              label={ellipsify(publicKey.toBase58())}
              path={`account/${publicKey}`}
              copyValue={publicKey.toBase58()}
              copyLabel="Copy address"
            />
          </Group>
        </Stack>
      }
    />
  );
}
