import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { ellipsify } from './ellipsify';

export function getAccountLabel(account: PublicKey | string) {
  switch (account.toString()) {
    case TOKEN_PROGRAM_ID.toString():
      return 'Token Program';
    case TOKEN_2022_PROGRAM_ID.toString():
      return 'Token 2022';
    default:
      return ellipsify(account.toString());
  }
}
