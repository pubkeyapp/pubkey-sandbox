import { ActionIcon, CopyButton, rem, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

export function UiCopyButton({
  label,
  value,
}: {
  label?: string;
  value: string;
}) {
  return (
    <CopyButton value={value}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? 'Copied' : label ?? 'Copy'}
          withArrow
          position="right"
        >
          <ActionIcon
            size="xs"
            color={copied ? 'teal' : 'brand'}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <IconCheck style={{ width: rem(12) }} />
            ) : (
              <IconCopy style={{ width: rem(12) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
