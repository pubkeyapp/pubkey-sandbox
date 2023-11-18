import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Group,
  Stack,
} from '@mantine/core';
import { Keypair } from '@solana/web3.js';
import { ellipsify } from '../../solana/ellipsify';
import { UiExplorerLink } from '../../ui/ui-explorer/ui-explorer-link';
import { notifySuccess } from '../../ui/ui-notify/ui-notify';
import { CounterProgramAccountProvider } from './counter-program-account-provider';
import { ProgramCounterAccount } from './program-counter-account';
import { useCounterFetchAll } from './use-counter-fetch-all';
import { useCounterInitialize } from './use-counter-initialize';

export function ProgramCounterList() {
  const fetchAllQuery = useCounterFetchAll();
  const initializeQuery = useCounterInitialize();

  return fetchAllQuery.isLoading ? (
    <Container>
      <p>Loading...</p>
    </Container>
  ) : (
    <Stack>
      <Group justify={'space-between'}>
        <Button
          onClick={() =>
            initializeQuery
              .mutateAsync({ keypair: Keypair.generate() })
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
                return fetchAllQuery.refetch();
              })
          }
          disabled={initializeQuery.isPending}
        >
          Create
        </Button>
        <Group>
          <Button
            variant="light"
            onClick={() => fetchAllQuery.refetch()}
            loading={fetchAllQuery.isLoading || fetchAllQuery.isFetching}
          >
            Refresh
          </Button>
        </Group>
      </Group>
      {fetchAllQuery.data?.length ? (
        fetchAllQuery.data.map((account) => (
          <Card withBorder key={account.publicKey.toString()}>
            <CounterProgramAccountProvider account={account}>
              <ProgramCounterAccount />
            </CounterProgramAccountProvider>
          </Card>
        ))
      ) : (
        <Box>
          <Alert variant="light" color="blue" title="No accounts found">
            Create an account to get started.
          </Alert>
        </Box>
      )}
    </Stack>
  );
}
