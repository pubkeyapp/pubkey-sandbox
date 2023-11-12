import { Box, Container, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';

export function UiHeroPage({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <Box py="xl">
      <Box ta="center">
        <Container className="max-w-2xl">
          {title ? <Title order={1}>{title}</Title> : null}
          {description ? <Text c="dimmed">{description}</Text> : null}
          {children}
        </Container>
      </Box>
    </Box>
  );
}
