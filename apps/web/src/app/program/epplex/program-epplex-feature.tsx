import { Box, Button, Card, Container, Group, Stack } from '@mantine/core';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import { ellipsify } from '../../solana/ellipsify';
import { UiDebug } from '../../ui/ui-debug/ui-debug';
import { UiExplorerLink } from '../../ui/ui-explorer/ui-explorer-link';
import { notifySuccess } from '../../ui/ui-notify/ui-notify';
import { ProgramMeta } from '../use-programs';
import {
  useEpplexFetchAll,
  useEpplexInitialize,
  useGetTokenAccounts,
} from './use-epplex-program-operations';
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';

export function ProgramEpplexFeature({
  programMeta,
}: {
  programMeta: ProgramMeta;
}) {
  const { publicKey } = useWallet();
  const accounts = useEpplexFetchAll({ programMeta });
  const initialize = useEpplexInitialize({ programMeta });

  const tokenAccountsQuery = useGetTokenAccounts({
    owner: publicKey || Keypair.generate().publicKey,
    programId: TOKEN_2022_PROGRAM_ID,
  });

  return accounts.isLoading ? (
    <Container>
      <p>Loading...</p>
    </Container>
  ) : (
    <Stack>
      <Card withBorder>
        <Group justify={'space-between'}>
          <Button
            onClick={() =>
              initialize
                .mutateAsync({ mint: Keypair.generate(), unixTime: 1000 })
                .then((signature) => {
                  notifySuccess({
                    message: (
                      <UiExplorerLink
                        label={ellipsify(signature)}
                        path={`tx/${signature}`}
                      >
                        View transaction {ellipsify(signature)}.
                      </UiExplorerLink>
                    ),
                  });
                  return accounts.refetch();
                })
            }
            disabled={initialize.isPending}
          >
            Create
          </Button>
          <Group>
            <Button
              onClick={() => accounts.refetch()}
              loading={accounts.isLoading || accounts.isFetching}
            >
              Refresh
            </Button>
          </Group>
        </Group>
      </Card>
      {tokenAccountsQuery.isLoading ? (
        <Stack>
          <p>Loading...</p>
        </Stack>
      ) : (
        <Stack>
          {tokenAccountsQuery.data?.value.map((account) => (
            <Card withBorder key={account.pubkey.toBase58()}>
              <UiDebug data={account} open />
            </Card>
          ))}
          <Button onClick={() => tokenAccountsQuery.refetch()}>Refresh</Button>
        </Stack>
      )}

      {accounts.data?.length ? (
        accounts.data.map((account) => (
          <Card withBorder key={account.publicKey.toBase58()}>
            <UiDebug data={account} open />
          </Card>
        ))
      ) : (
        <Box>
          <p>No accounts found.</p>
        </Box>
      )}
    </Stack>
  );
}
