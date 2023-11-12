import { Flex } from '@mantine/core';
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { ReactNode } from 'react';
import { UiHeroPage } from '../ui/ui-hero-page';

export function WalletGate({ children }: { children: ReactNode }) {
  const { connected, publicKey } = useWallet();

  return connected && publicKey ? (
    children
  ) : (
    <UiHeroPage
      title="Connect your wallet"
      description={
        <Flex align="center" justify="center" mt="md">
          <WalletMultiButton />
        </Flex>
      }
    />
  );
}
