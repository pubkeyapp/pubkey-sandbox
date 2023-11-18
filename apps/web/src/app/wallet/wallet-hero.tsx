import { Group, Stack, Title } from '@mantine/core';
import { useConnection } from '@solana/wallet-adapter-react';
import { ellipsify } from '../solana/ellipsify';
import { PublicKeyString } from '../solana/get-public-key';
import { SolanaAirdropSol } from '../solana/solana-airdrop-sol';
import { SolanaGetBalance } from '../solana/solana-get-balance';
import { SolanaReceiveSolButton } from '../solana/solana-receive-sol-button';
import { SolanaSendSolButton } from '../solana/solana-send-sol-button';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';
import { UiHeroPage } from '../ui/ui-hero-page';

export function WalletHero({ publicKey }: { publicKey: PublicKeyString }) {
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
              label={ellipsify(publicKey.toString())}
              path={`account/${publicKey}`}
              copyValue={publicKey.toString()}
              copyLabel="Copy address"
            />
          </Group>
        </Stack>
      }
    />
  );
}
