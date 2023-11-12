import { Box } from '@mantine/core';
import { useState } from 'react';
import { UiHeroPage } from '../ui/ui-hero-page';
import { ClusterUiModal } from './cluster-ui-modal';
import { ClusterUiTable } from './cluster-ui-table';

export default function ClusterFeatureList() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box>
      <UiHeroPage
        title="Clusters"
        description="Manage and select your Solana clusters"
      />
      <ClusterUiModal show={showModal} hideModal={() => setShowModal(false)} />
      <ClusterUiTable addClusterModal={() => setShowModal(true)} />
    </Box>
  );
}
