import {
  ActionIcon,
  Anchor,
  Button,
  Code,
  Group,
  Menu,
  Table,
  UnstyledButton,
} from '@mantine/core';
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
import { useState } from 'react';

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
            <Group c="dimmed" fz="xs">
              {item.type}
            </Group>
            <UiCopyButton value={item.secret} label={'Copy Secret'} />
            <ShowSecret secret={item.secret} />
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
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export function ShowSecret({ secret }: { secret: string }) {
  const [show, setShow] = useState(false);

  return show ? (
    <Group gap={4}>
      <UnstyledButton onClick={() => setShow(false)} fz="xs">
        Hide Secret
      </UnstyledButton>
      <Code>{secret}</Code>
    </Group>
  ) : (
    <UnstyledButton onClick={() => setShow(true)} fz="xs">
      Show Secret
    </UnstyledButton>
  );
}
