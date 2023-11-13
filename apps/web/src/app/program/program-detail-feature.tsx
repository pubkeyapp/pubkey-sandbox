import { Box, Group, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { ellipsify } from '../solana/ellipsify';
import { UiDebug } from '../ui/ui-debug/ui-debug';
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
          <Group justify="center" mt="lg">
            <UiExplorer
              label={ellipsify(program.account)}
              path={`account/${program.account}`}
              copyValue={program.account}
              copyLabel="Copy address"
            />
          </Group>
        }
      />
      <Box mt="md">
        <ProgramRenderFeature program={program} />
      </Box>
      <Box mt="md">
        <UiDebug data={program.idl} />
      </Box>
    </Box>
  );
}
