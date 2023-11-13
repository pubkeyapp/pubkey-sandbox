import { ActionIcon, Button, Group, Table } from '@mantine/core';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import { useCluster } from './cluster-provider';

export function ClusterUiTable({
  addClusterModal,
}: {
  addClusterModal: () => void;
}) {
  const { clusters, setCluster, deleteCluster } = useCluster();

  const rows = (clusters ?? []).map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.network ?? 'custom'}</Table.Td>
      <Table.Td>{item.endpoint}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon disabled={item?.active} onClick={() => setCluster(item)}>
            <IconCheck size={16} />
          </ActionIcon>
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
          <Table.Th>Network</Table.Th>
          <Table.Th>Endpoint</Table.Th>
          <Table.Th w={100}>
            <Button onClick={() => addClusterModal()}>Add</Button>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
