import { Box } from '@mantine/core';
import { UiHeroPage } from '../ui/ui-hero-page';
import { ClusterButtons, ClusterUiTable } from './cluster-ui';

export default function () {
  return (
    <Box>
      <UiHeroPage
        title="Clusters"
        description="Manage and select your Solana clusters"
      >
        <ClusterButtons />
      </UiHeroPage>
      <ClusterUiTable />
    </Box>
  );
}
