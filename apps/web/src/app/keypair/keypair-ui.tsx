import { ActionIcon, Anchor, Button, Group, Menu, Table } from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconCheck,
  IconDatabaseImport,
  IconServer,
  IconTrash,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { UiCopyButton } from '../ui/ui-explorer/ui-copy-button';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';
import { useKeypair } from './keypair-provider';

export function KeypairButtons() {
  const { generateKeypair, importKeypair } = useKeypair();

  return (
    <Group>
      <Button
        variant="light"
        leftSection={<IconServer size={16} />}
        onClick={() => generateKeypair()}
      >
        Generate Keypair
      </Button>
      <Button
        variant="light"
        leftSection={<IconDatabaseImport size={16} />}
        onClick={() => {
          const url = window.prompt(
            'Enter the url of the keypair to import. To check the format, click the export button and check the browser console or file.'
          );
          if (url) {
            importKeypair(url);
          }
        }}
      >
        Import Keypair
      </Button>
    </Group>
  );
}

export function KeypairUiSelect() {
  const { keypairs, setKeypair, keypair } = useKeypair();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="light">{keypair.name}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {keypairs.map((item) => (
          <Menu.Item
            key={item.name}
            onClick={() => setKeypair(item)}
            leftSection={item.active ? <IconCheck /> : <IconArrowsLeftRight />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Item component={Link} to="/keypairs">
          Manage Keypairs
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export function KeypairUiTable() {
  const { keypairs, setKeypair, deleteKeypair } = useKeypair();

  const rows = (keypairs ?? []).map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Anchor
          component="button"
          onClick={() => setKeypair(item)}
          fw={item.active ? 'bold' : 'normal'}
        >
          {item.name}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Group>
          <UiExplorer
            path={`account/${item.publicKey}`}
            label={item.publicKey}
            copyLabel="Copy public key"
            copyValue={item.publicKey}
          />
        </Group>
        {item.secret ? (
          <Group gap={4} c="dimmed" fz="xs">
            Copy secret <UiCopyButton value={item.secret} />
          </Group>
        ) : null}
      </Table.Td>
      <Table.Td align="right">
        <Group gap="xs">
          <ActionIcon
            disabled={item?.active}
            onClick={() => {
              if (!window.confirm('Are you sure?')) return;
              deleteKeypair(item);
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
