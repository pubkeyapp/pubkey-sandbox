import { Idl } from '@coral-xyz/anchor';
import { CounterIDL } from '@pubkey-sandbox/anchor';
import { IDL as EpPlexIDL } from './epplex/ephemeralityTypes';

export interface ProgramMeta {
  id: string;
  app: 'counter' | 'ephemerality' | 'none';
  account: string;
  idl: Idl;
}
export type ProgramApps = ProgramMeta['app'];
export function usePrograms(): ProgramMeta[] {
  return [counterMeta, epPlexMeta, epPlexMetaDevnet];
}

const counterMeta: ProgramMeta = {
  account: 'CouTv1Zs5BKfEvnxQsvPYEHPY8DYfcnWNWwfUWVSobV',
  id: 'counter',
  app: 'counter',
  idl: CounterIDL,
};

const epPlexMeta: ProgramMeta = {
  account: '8P12Mz66EEBeYQgbhpe3fhfA8xXPHPyPT29868xU1vVj',
  id: 'ephemerality',
  app: 'ephemerality',
  idl: EpPlexIDL,
};

const epPlexMetaDevnet: ProgramMeta = {
  ...epPlexMeta,
  account: 'BcKkiAcNredLZdQySoHt7okfhDNA32r9mJayjy8cMDdY',
  id: 'ephemerality-devnet',
};
