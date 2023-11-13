import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconBug } from '@tabler/icons-react';
import React from 'react';
import { UiDebug } from '../ui-debug/ui-debug';

export function handleDebugModalClick({
  data,
  title,
}: {
  data: string | unknown;
  title?: string;
}) {
  return modals.open({
    size: 'lg',
    title: title ?? 'Debug',
    children: <UiDebug data={data} open hideButton />,
  });
}

export function UiDebugModal({
  data,
  title,
  tooltip = 'Show debug data',
}: {
  data: string | unknown;
  title?: string;
  tooltip?: string;
}) {
  return (
    <Tooltip label={tooltip} position="right" withArrow>
      <ActionIcon
        color="brand"
        variant="subtle"
        size="xs"
        onClick={() => handleDebugModalClick({ data, title })}
      >
        <IconBug size={14} />
      </ActionIcon>
    </Tooltip>
  );
}
