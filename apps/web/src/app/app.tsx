import { Container } from '@mantine/core';
import { UiAlert } from './ui/ui-alert/ui-alert';
import { UiTheme } from './ui/ui-theme/ui-theme';

export function App() {
  return (
    <UiTheme>
      <Container py="xl">
        <UiAlert message={'Hello World'} />
      </Container>
    </UiTheme>
  );
}
