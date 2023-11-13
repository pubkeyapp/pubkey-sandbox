import { BN, Program } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAnchorProvider } from '../use-anchor-provider';
import { ProgramMeta } from '../use-programs';
import { IDL as EpplexIDL } from './ephemeralityTypes';

export function useEpplexFetchAll({
  programMeta,
}: {
  programMeta: ProgramMeta;
}) {
  const provider = useAnchorProvider();
  const program = new Program(
    EpplexIDL,
    new PublicKey(programMeta.account),
    provider
  );

  return useQuery({
    queryKey: ['counter', 'fetch-all'],
    queryFn: () => program.account.programDelegate.all(),
  });
}

export function useGetTokenAccounts({
  owner,
  programId,
}: {
  owner: PublicKey;
  programId: PublicKey;
}) {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ['counter', 'get-token-accounts', { owner }],
    queryFn: () => connection.getTokenAccountsByOwner(owner, { programId }),
  });
}

export function useEpplexInitialize({
  programMeta,
}: {
  programMeta: ProgramMeta;
}) {
  const wallet = useAnchorWallet();
  const provider = useAnchorProvider();
  const program = new Program(
    EpplexIDL,
    new PublicKey(programMeta.account),
    provider
  );

  return useMutation({
    mutationKey: ['counter', 'initialize'],
    mutationFn: ({ mint, unixTime }: { mint: Keypair; unixTime: number }) => {
      if (!wallet) throw new Error('Wallet not connected');

      const current = Math.floor(new Date().getTime() / 1000);
      const offset = unixTime - current;

      return program.methods
        .tokenCreate({
          name: 'Epplex',
          uri: 'https://www.epplex.com',
          destroyTimestampOffset: new BN(offset),
          symbol: 'EPP',
        })
        .accounts({
          mint: mint.publicKey,
          programDelegate: new PublicKey(
            'LNGnWhP1L17aoedd4dyg8RqVAMSA719KaddWF3Nh3Fn'
          ),
          payer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          token22Program: TOKEN_2022_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([])
        .rpc();
    },
  });
}

export function getProgramDelegate({
  programId,
}: {
  programId: PublicKey;
}): PublicKey {
  const [programDelegate] = PublicKey.findProgramAddressSync(
    [
      // Buffer.from('PROGRAM_DELEGATE') fails, so we use this workaround
      hexToUint8Array('50524f4752414d5f44454c4547415445'),
    ],
    programId
  );
  return programDelegate;
}

function hexToUint8Array(hexString: string) {
  // Check if the input is a valid hexadecimal string
  if (!/^[0-9a-fA-F]+$/.test(hexString) || hexString.length % 2 !== 0) {
    throw new Error('Invalid hexadecimal string');
  }

  const bytes = [];
  for (let i = 0; i < hexString.length; i += 2) {
    bytes.push(parseInt(hexString.substring(i, i + 2), 16));
  }

  return Uint8Array.from(bytes);
}
