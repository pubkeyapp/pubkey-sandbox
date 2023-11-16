import { Box } from '@mantine/core';
import { UiHeroPage } from '../ui/ui-hero-page';
import { KeypairButtons, KeypairUiTable } from './keypair-ui';

export default function () {
  return (
    <Box>
      <UiHeroPage
        title="Keypairs"
        description="Manage and select your Solana keypairs"
      >
        <KeypairButtons />
      </UiHeroPage>
      <KeypairUiTable />
    </Box>
  );
}
