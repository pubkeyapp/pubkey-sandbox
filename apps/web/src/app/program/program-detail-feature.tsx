import { Box, Group, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { ellipsify } from '../solana/ellipsify';
import { UiDebugModal } from '../ui/ui-debug-modal/ui-debug-modal';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';
import { UiHeroPage } from '../ui/ui-hero-page';
import { ProgramRenderFeature } from './program-render-feature';
import { usePrograms } from './use-programs';

export function ProgramDetailFeature() {
  const { programId } = useParams() as { programId: string };
  const programs = usePrograms();
  const program = programs.find((program) => program.id === programId);
  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <Box>
      <UiHeroPage
        title={<Title order={1}>{program.idl.name}</Title>}
        description={
          <Group justify="center" mt="lg" gap={2}>
            <UiExplorer
              label={ellipsify(program.account)}
              path={`account/${program.account}`}
              copyValue={program.account}
              copyLabel="Copy address"
            />
            <UiDebugModal
              data={program.idl}
              tooltip="Show IDL"
              title={`IDL for ${program.id}`}
            />
          </Group>
        }
      />
      <Box mt="md">
        <ProgramRenderFeature program={program} />
      </Box>
    </Box>
  );
}
