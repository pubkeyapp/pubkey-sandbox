import { Button, Menu } from '@mantine/core';
import { IconArrowsLeftRight, IconCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useCluster } from './cluster-provider';

export function ClusterUiSelect() {
  const { clusters, setCluster, cluster } = useCluster();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>{cluster.name}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {clusters.map((item) => (
          <Menu.Item
            key={item.name}
            onClick={() => setCluster(item)}
            leftSection={item.active ? <IconCheck /> : <IconArrowsLeftRight />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Item component={Link} to="/clusters">
          Manage Clusters
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
