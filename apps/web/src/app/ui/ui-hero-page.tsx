import { Box, Container, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';

export function UiHeroPage({
  title,
  description,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Box py="xl">
      <Box ta="center">
        <Container className="max-w-2xl">
          {title && typeof title === 'string' ? (
            <Title order={1}>{title}</Title>
          ) : (
            title
          )}
          {description && typeof description === 'string' ? (
            <Text c="dimmed">{description}</Text>
          ) : (
            description
          )}
          {children}
        </Container>
      </Box>
    </Box>
  );
}
