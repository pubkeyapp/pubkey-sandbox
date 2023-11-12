import { Button, ButtonProps } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useCluster } from '../../cluster/cluster-provider';

export function UiExplorerButton({
  label = 'View on Solana Explorer',
  path,
  ...props
}: ButtonProps & {
  label: string;
  path: string;
}) {
  const { getExplorerUrl } = useCluster();
  return (
    <Button
      color="brand"
      variant="light"
      component="a"
      href={getExplorerUrl(path)}
      target="_blank"
      rel="noopener noreferrer"
      rightSection={<IconExternalLink size={15} />}
      {...props}
    >
      {label}
    </Button>
  );
}
