import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  Menu,
  Select,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  IconArrowsLeftRight,
  IconCheck,
  IconDatabaseExport,
  IconDatabaseImport,
  IconServer,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UiCopyButton } from '../ui/ui-explorer/ui-copy-button';
import { useCluster } from './cluster-provider';

export function ClusterButtons() {
  const { clusters, importCluster } = useCluster();

  return (
    <Group>
      <Button
        variant="light"
        leftSection={<IconServer size={16} />}
        onClick={() =>
          modals.open({ title: 'Add Cluster', children: <ClusterForm /> })
        }
      >
        Add Cluster
      </Button>
      <Button
        variant="light"
        leftSection={<IconDatabaseImport size={16} />}
        onClick={() => {
          const url = window.prompt(
            'Enter the url of the cluster to import. To check the format, click the export button and check the browser console or file.'
          );
          if (url) {
            importCluster(url);
          }
        }}
      >
        Import Clusters
      </Button>
      <Button
        variant="light"
        leftSection={<IconDatabaseExport size={16} />}
        onClick={() => {
          const data = JSON.stringify(clusters, null, 2);
          console.log(data);
          if (!window.confirm('Export clusters to your downloads folder?')) {
            return;
          }
          const blob = new Blob([data], { type: 'text/json' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'clusters.json';
          link.href = url;
          link.click();
        }}
      >
        Export Clusters
      </Button>
    </Group>
  );
}

export function ClusterUiSelect() {
  const { clusters, setCluster, cluster } = useCluster();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="light">{cluster.name}</Button>
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

export function ClusterUiTable() {
  const { clusters, setCluster, deleteCluster } = useCluster();

  const rows = (clusters ?? []).map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Anchor
          component="button"
          onClick={() => setCluster(item)}
          fw={item.active ? 'bold' : 'normal'}
        >
          {item.name}
        </Anchor>
        <Text size="xs" c="dimmed">
          {item.network ?? 'custom'}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap={4}>
          <UiCopyButton value={item.endpoint} /> {item.endpoint}
        </Group>
      </Table.Td>
      <Table.Td align="right">
        <Group gap="xs">
          <ActionIcon
            disabled={item?.active}
            onClick={() => {
              if (!window.confirm('Are you sure?')) return;
              deleteCluster(item);
            }}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Network/Endpoint</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export function ClusterForm() {
  const { addCluster } = useCluster();
  const [name, setName] = useState('');
  const [network, setNetwork] = useState<WalletAdapterNetwork | string>('');
  const [endpoint, setEndpoint] = useState('');

  return (
    <div>
      <TextInput
        label="Name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <TextInput
        label="Endpoint"
        placeholder="Enter endpoint"
        value={endpoint}
        onChange={(e) => setEndpoint(e.currentTarget.value)}
      />

      <Select
        data={[
          { value: '', label: 'Custom' },
          { value: 'devnet', label: 'Devnet' },
          { value: 'testnet', label: 'Testnet' },
          { value: 'mainnet', label: 'Mainnet' },
        ]}
        label="Network"
        placeholder="Select network"
        value={network}
        onChange={(value) => setNetwork(value as WalletAdapterNetwork)}
      />

      <Group mt="xl" justify="end">
        <Button
          onClick={() => {
            addCluster({
              name,
              network: network as WalletAdapterNetwork,
              endpoint,
            });
            return modals.closeAll();
          }}
        >
          Save
        </Button>
        <Button variant="light" onClick={() => modals.closeAll()}>
          Close
        </Button>
      </Group>
    </div>
  );
}
