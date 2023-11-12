import { Anchor, Group } from '@mantine/core';
import { useCluster } from '../../cluster/cluster-provider';
import { UiCopyButton } from './ui-copy-button';

export function UiExplorer({
  label = 'View on Solana Explorer',
  path,
  copyLabel,
  copyValue,
}: {
  label: string;
  path: string;
  copyLabel?: string;
  copyValue?: string;
}) {
  const { getExplorerUrl } = useCluster();
  const link = (
    <Anchor
      c="brand"
      href={getExplorerUrl(path)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </Anchor>
  );
  return copyValue ? (
    <Group gap={2}>
      {link}
      <UiCopyButton value={copyValue} label={copyLabel} />
    </Group>
  ) : (
    link
  );
}
