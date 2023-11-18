import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useConnection } from '@solana/wallet-adapter-react';
import { IconRefresh } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { UiDebugModal } from '../ui/ui-debug-modal/ui-debug-modal';
import { UiCopyButton } from '../ui/ui-explorer/ui-copy-button';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';
import { getAccountLabel } from './get-account-label';
import { PublicKeyString } from './get-public-key';
import { SolanaGetTokenBalance } from './solana-get-token-balance';
import { SolanaSendTokenButton } from './solana-send-token-button';
import { useGetTokenAccounts } from './use-get-token-accounts';

export function SolanaGetTokenAccounts({
  publicKey,
}: {
  publicKey: PublicKeyString;
}) {
  const { connection } = useConnection();
  const [showAll, setShowAll] = useState(false);
  const query = useGetTokenAccounts({ publicKey });
  const client = useQueryClient();
  const items = useMemo(() => {
    if (showAll) return query.data;
    return query.data?.slice(0, 5);
  }, [query.data, showAll]);

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Token Accounts</Title>
        <ActionIcon
          variant="subtle"
          onClick={async () => {
            await query.refetch();
            await client.invalidateQueries({
              queryKey: ['getTokenAccountBalance'],
            });
          }}
        >
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
                <Table.Th>Public Key</Table.Th>
                <Table.Th>Mint</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items?.map(({ account, pubkey }) => (
                <Table.Tr key={pubkey.toString()}>
                  <Table.Td>
                    <Group gap={2}>
                      <Text ff="monospace">
                        <UiExplorer
                          label={getAccountLabel(pubkey)}
                          path={`account/${pubkey.toString()}`}
                        />
                      </Text>
                      <UiCopyButton
                        value={pubkey.toString()}
                        label="Copy Address"
                      />
                      <UiDebugModal data={account} />
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={2}>
                      <Text ff="monospace">
                        <UiExplorer
                          label={getAccountLabel(account.data.parsed.info.mint)}
                          path={`account/${account.data.parsed.info.mint.toString()}`}
                        />
                      </Text>
                      <UiCopyButton
                        value={account.data.parsed.info.mint.toString()}
                        label="Copy Address"
                      />
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group justify="end" gap="xs">
                      <Text ff="monospace">
                        <SolanaGetTokenBalance
                          connection={connection}
                          account={pubkey}
                        />
                      </Text>
                      <SolanaSendTokenButton
                        account={pubkey}
                        accountOwner={publicKey}
                        accountData={account.data.parsed}
                        tokenProgramId={account.owner}
                        size="xs"
                        variant="light"
                      />
                    </Group>
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
