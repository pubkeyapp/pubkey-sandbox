import { Anchor, Card, SimpleGrid, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { UiHeroPage } from '../ui/ui-hero-page';
import { usePrograms } from './use-programs';

export function ProgramIndexFeature() {
  const programs = usePrograms();
  return (
    <Stack>
      <UiHeroPage
        title={<Title order={1}>Programs</Title>}
        description={
          <SimpleGrid cols={3} spacing="lg" mt="lg">
            {programs.map((programs) => (
              <Card withBorder key={programs.id}>
                <Anchor component={Link} to={programs.id} ff="monospace">
                  {programs.id}
                </Anchor>
              </Card>
            ))}
          </SimpleGrid>
        }
      />
    </Stack>
  );
}
