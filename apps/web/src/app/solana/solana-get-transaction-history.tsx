import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { IconRefresh } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { UiCopyButton } from '../ui/ui-explorer/ui-copy-button';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';
import { UiTime } from '../ui/ui-time/ui-time';
import { ellipsify } from './ellipsify';
import { useGetTransactionHistory } from './use-get-transaction-history';

export function SolanaGetTransactionHistory({
  publicKey,
}: {
  publicKey: PublicKey;
}) {
  const [showAll, setShowAll] = useState(false);
  const query = useGetTransactionHistory({ publicKey });

  const items = useMemo(() => {
    if (showAll) return query.data;
    return query.data?.slice(0, 5);
  }, [query.data, showAll]);

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Transaction History</Title>
        <ActionIcon variant="subtle" onClick={() => query.refetch()}>
          <IconRefresh size={16} />
        </ActionIcon>
      </Group>
      {query.isLoading && <div>Loading...</div>}
      {query.isError && <div>Error: {query.error?.message.toString()}</div>}
      {query.isSuccess && (
        <div>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Signature</Table.Th>
                <Table.Th>Block</Table.Th>
                <Table.Th>Memo</Table.Th>
                <Table.Th>Timestamp</Table.Th>
                <Table.Th>Result</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items?.map(({ signature, memo, slot, err, blockTime }) => (
                <Table.Tr key={signature}>
                  <Table.Td>
                    <Group gap={2}>
                      <Text ff="monospace">
                        <UiExplorer
                          label={ellipsify(signature)}
                          path={`tx/${signature}`}
                        />
                      </Text>
                      <UiCopyButton value={signature} label="Copy signature" />
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={2}>
                      <Text ff="monospace">
                        <UiExplorer
                          label={slot.toString()}
                          path={`block/${slot}`}
                        />
                      </Text>
                      <UiCopyButton value={slot.toString()} label="Copy slot" />
                    </Group>
                  </Table.Td>
                  <Table.Td>{memo ?? 'None'}</Table.Td>
                  <Table.Td>
                    <UiTime datetime={new Date((blockTime ?? 0) * 1000)} />
                  </Table.Td>
                  <Table.Td>
                    {err ? (
                      <Badge color={'red'}>Failed</Badge>
                    ) : (
                      <Badge color={'green'}>Success</Badge>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Group justify="center">
            {query.data.length > 5 && (
              <Button
                mt="sm"
                size={'xs'}
                onClick={() => setShowAll(!showAll)}
                variant="light"
              >
                {showAll ? 'Show Less' : 'Show All'}
              </Button>
            )}
          </Group>
        </div>
      )}
    </Stack>
  );
}
