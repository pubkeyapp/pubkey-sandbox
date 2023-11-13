import { Box, Container, Flex, Group } from '@mantine/core';
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui';
import { ReactNode } from 'react';
import { ClusterUiSelect } from './cluster/cluster-ui-select';
import { SolanaClusterVersion } from './solana/solana-cluster-version';
import { UiFooter } from './ui/ui-footer/ui-footer';
import { UiHeader, UiHeaderLink } from './ui/ui-header/ui-header';

export function AppLayout({ children }: { children: ReactNode }) {
  const links: UiHeaderLink[] = [
    { label: 'Programs', link: '/programs' },
    { label: 'Wallet', link: '/wallet' },
  ];

  return (
    <Flex h="100%" direction="column" justify="space-between">
      <UiHeader
        links={links}
        profile={
          <Group>
            <WalletMultiButton />
            <ClusterUiSelect />
          </Group>
        }
      />

      <Box style={{ flexGrow: 1 }}>
        <Container>{children}</Container>
      </Box>
      <UiFooter>
        <SolanaClusterVersion>
          <Box ta="center">PubKey</Box>
        </SolanaClusterVersion>
      </UiFooter>
    </Flex>
  );
}
