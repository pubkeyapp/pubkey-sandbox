import { Program } from '@coral-xyz/anchor';
import { Counter, CounterIDL } from '@pubkey-sandbox/anchor';
import { createContext, ReactNode, useContext } from 'react';
import { getPublicKey } from '../../solana/get-public-key';
import { useAnchorProvider } from '../use-anchor-provider';
import { ProgramMeta } from '../use-programs';

export interface CounterProgramProviderContext {
  program: Program<Counter>;
}

const Context = createContext<CounterProgramProviderContext>(
  {} as CounterProgramProviderContext
);

export function CounterProgramProvider({
  children,
  programMeta,
}: {
  children: ReactNode;
  programMeta: ProgramMeta;
}) {
  const provider = useAnchorProvider();
  const program = new Program(
    CounterIDL,
    getPublicKey(programMeta.account),
    provider
  );

  return (
    <Context.Provider
      value={{
        program,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCounterProgram() {
  return useContext(Context);
}
