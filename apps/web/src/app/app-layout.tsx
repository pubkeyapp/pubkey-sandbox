import { Box, Container, Flex, Group } from '@mantine/core';
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui';
import { ReactNode } from 'react';
import { ClusterUiSelect } from './cluster/cluster-ui-select';
import { UiHeader, UiHeaderLink } from './ui/ui-header/ui-header';

export function AppLayout({ children }: { children: ReactNode }) {
  const links: UiHeaderLink[] = [
    { label: 'Home', link: '/home' },
    { label: 'Solana', link: '/solana' },
    { label: 'Clusters', link: '/clusters' },
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
      <Box ta="center" bg={'dark.8'}>
        <p>PubKey</p>
      </Box>
    </Flex>
  );
}
