import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { ellipsify } from './ellipsify';
import { PublicKeyString } from './get-public-key';

export function getAccountLabel(account: PublicKeyString) {
  switch (account.toString()) {
    case TOKEN_PROGRAM_ID.toString():
      return 'Token Program';
    case TOKEN_2022_PROGRAM_ID.toString():
      return 'Token 2022';
    default:
      return ellipsify(account.toString());
  }
}
