import { Program } from '@coral-xyz/anchor';
import { Counter, IDL as CounterIDL } from '../target/types/counter';
export * from '../target/types/counter';
export { CounterIDL };
export type CounterProgram = Program<Counter>;
