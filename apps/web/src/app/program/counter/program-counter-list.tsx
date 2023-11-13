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
import { ProgramCounterAccount } from './program-counter-account';
import {
  useCounterFetchAll,
  useCounterInitialize,
} from './use-counter-program-operations';

export function ProgramCounterList() {
  const allAccountsQuery = useCounterFetchAll();
  const counterInitialize = useCounterInitialize();

  return allAccountsQuery.isLoading ? (
    <Container>
      <p>Loading...</p>
    </Container>
  ) : (
    <Stack>
      <Group justify={'space-between'}>
        <Button
          onClick={() =>
            counterInitialize
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
                return allAccountsQuery.refetch();
              })
          }
          disabled={counterInitialize.isPending}
        >
          Create
        </Button>
        <Group>
          <Button
            variant="light"
            onClick={() => allAccountsQuery.refetch()}
            loading={allAccountsQuery.isLoading || allAccountsQuery.isFetching}
          >
            Refresh
          </Button>
        </Group>
      </Group>
      {allAccountsQuery.data?.length ? (
        allAccountsQuery.data.map((account) => (
          <Card withBorder key={account.publicKey.toBase58()}>
            <ProgramCounterAccount account={account} />
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
