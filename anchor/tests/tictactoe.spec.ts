import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Tictactoe } from '../target/types/tictactoe';

describe('tictactoe', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Tictactoe as Program<Tictactoe>;

  const dashboard = anchor.web3.Keypair.generate();
  const game = anchor.web3.Keypair.generate();
  const player_o = anchor.web3.Keypair.generate();

  beforeAll(async () => {
    // AirDrop 1 SOL to payer.
    const tx = await provider.connection.requestAirdrop(
      player_o.publicKey,
      1000000000
    );
    console.log('airdrop: ', tx);
  });

  fit('Initialize Dashboard', async () => {
    const tx = await program.rpc.initializeDashboard({
      accounts: {
        authority: payer.publicKey,
        dashboard: dashboard.publicKey,
      },
      signers: [dashboard],
      instructions: [
        await program.account.dashboard.createInstruction(dashboard),
      ],
    });
    console.log('transaction: ', tx);
  });

  it('Initialize Game', async () => {
    const tx = await program.rpc.initialize({
      accounts: {
        playerX: payer.publicKey,
        dashboard: dashboard.publicKey,
        game: game.publicKey,
      },
      signers: [game],
      instructions: [await program.account.game.createInstruction(game)],
    });

    console.log('transaction: ', tx);
  });

  it('Player O joins', async () => {
    const tx = await program.rpc.playerJoin({
      accounts: {
        playerO: player_o.publicKey,
        game: game.publicKey,
      },
      signers: [player_o],
    });

    console.log('transaction: ', tx);
  });

  it('Player x plays', async () => {
    const tx = await program.rpc.playerMove(1, 0, {
      accounts: {
        player: payer.publicKey,
        game: game.publicKey,
      },
    });
    console.log('transaction: ', tx);
  });

  it('Player o plays', async () => {
    const tx = await program.rpc.playerMove(2, 1, {
      accounts: {
        player: player_o.publicKey,
        game: game.publicKey,
      },
      signers: [player_o],
    });
    console.log('transaction: ', tx);
  });

  it('Player x plays', async () => {
    const tx = await program.rpc.playerMove(1, 3, {
      accounts: {
        player: payer.publicKey,
        game: game.publicKey,
      },
    });
    console.log('transaction: ', tx);
  });

  it('Player o plays', async () => {
    const tx = await program.rpc.playerMove(2, 6, {
      accounts: {
        player: player_o.publicKey,
        game: game.publicKey,
      },
      signers: [player_o],
    });
    console.log('transaction: ', tx);
  });

  it('Player x plays', async () => {
    const tx = await program.rpc.playerMove(1, 2, {
      accounts: {
        player: payer.publicKey,
        game: game.publicKey,
      },
    });
    console.log('transaction: ', tx);
  });

  it('Player o plays', async () => {
    const tx = await program.rpc.playerMove(2, 4, {
      accounts: {
        player: player_o.publicKey,
        game: game.publicKey,
      },
      signers: [player_o],
    });
    console.log('transaction: ', tx);
  });

  it('Player x plays', async () => {
    const tx = await program.rpc.playerMove(1, 5, {
      accounts: {
        player: payer.publicKey,
        game: game.publicKey,
      },
    });
    console.log('transaction: ', tx);
  });

  it('Player o plays', async () => {
    const tx = await program.rpc.playerMove(2, 8, {
      accounts: {
        player: player_o.publicKey,
        game: game.publicKey,
      },
      signers: [player_o],
    });
    console.log('transaction: ', tx);
  });

  it('Player x plays', async () => {
    const tx = await program.rpc.playerMove(1, 7, {
      accounts: {
        player: payer.publicKey,
        game: game.publicKey,
      },
    });
    console.log('transaction: ', tx);
  });

  it('Status', async () => {
    const tx = await program.rpc.status({
      accounts: {
        dashboard: dashboard.publicKey,
        game: game.publicKey,
      },
    });

    console.log('transaction: ', tx);
  });
});
