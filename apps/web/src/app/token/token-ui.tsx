import { Badge, Button, Code, Group, Stack } from '@mantine/core';
import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useConnection } from '@solana/wallet-adapter-react';
import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { useState } from 'react';
import { secretToKeypair, useKeypair } from '../keypair/keypair-provider';
import { getPublicKey, PublicKeyString } from '../solana/get-public-key';
import { SolanaGetBalance } from '../solana/solana-get-balance';
import { notifySignatureLink } from '../ui/ui-explorer/ui-explorer-link';

export function TokenCreate() {
  const { connection } = useConnection();
  const { keypair: feePayer } = useKeypair();
  const [keypair, setKeypair] = useState<Keypair>(() => Keypair.generate());

  function create() {
    //
    try {
      if (!feePayer.secret) {
        return;
      }
      console.log('feePayer.secret', feePayer.secret);
      const kp = secretToKeypair(feePayer.secret);
      console.log('kp', kp.publicKey.toString());
      createMint({
        connection,
        feePayer: kp,
        mint: keypair,
        mintAuthority: keypair.publicKey,
      }).then((res) => {
        notifySignatureLink({
          signature: res,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Create Mint</h1>
      <Stack>
        <Group>
          <Code>{keypair.publicKey.toString()}</Code>
          <Button size="xs" onClick={() => setKeypair(Keypair.generate())}>
            Regenerate
          </Button>
        </Group>
        <Group>
          <Code>{feePayer.publicKey}</Code>
          <Badge color="green">Fee Payer</Badge>
          <span>
            Balance:{' '}
            <SolanaGetBalance
              connection={connection}
              publicKey={feePayer.publicKey}
            />
          </span>
        </Group>
        <Group>
          <Button size="xs" onClick={create}>
            Mint!
          </Button>
        </Group>
      </Stack>
    </div>
  );
}

async function createMint({
  connection,
  feePayer,
  mint,
  mintAuthority,
}: {
  connection: Connection;
  feePayer: Keypair;
  mint: Keypair;
  mintAuthority: PublicKeyString;
}) {
  const tx = new Transaction();
  tx.add();
  const instructions = [
    // create account
    SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports: await getMinimumBalanceForRentExemptMint(connection),
      programId: TOKEN_PROGRAM_ID,
    }),
    // init mint
    createInitializeMintInstruction(
      mint.publicKey, // mint pubkey
      9, // decimals
      getPublicKey(mintAuthority), // mint authority (an auth to mint token)
      null // freeze authority (we use null first, the auth can let you freeze user's token account)
    ),
  ];

  // Get the lates block hash to use on our transaction and confirmation
  const latestBlockhash = await connection.getLatestBlockhash();

  // Create a new TransactionMessage with version and compile it to legacy
  const messageLegacy = new TransactionMessage({
    payerKey: feePayer.publicKey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions,
  }).compileToLegacyMessage();

  // Create a new VersionedTransaction which supports legacy and v0
  const transaction = new VersionedTransaction(messageLegacy);
  transaction.sign([feePayer, mint]);

  return connection.sendTransaction(transaction);
}
