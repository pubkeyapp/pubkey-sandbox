import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { Chat } from '../target/types/chat';

describe('counter', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Chat as Program<Chat>;

  const chatRoom = anchor.web3.Keypair.generate();

  // it('Initialize Chat', async () => {
  //   await program.methods
  //     .createUser('test')
  //     .accounts({
  //       user: counterKeypair.publicKey,
  //       authority: payer.publicKey,
  //     })
  //     .signers([counterKeypair])
  //     .rpc();
  //
  //   const currentCount = await program.account.user.fetch(
  //     counterKeypair.publicKey
  //   );
  //
  //   expect(currentCount.name).toEqual('test');
  // });

  it('Creates a chat room', async () => {
    await program.rpc.createChatRoom('Test Chat', {
      accounts: {
        chatRoom: chatRoom.publicKey,
        // rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      instructions: [
        await program.account.chatRoom.createInstruction(chatRoom),
      ],
      signers: [chatRoom],
    });

    const chat = await program.account.chatRoom.fetch(chatRoom.publicKey);
    const name = new TextDecoder('utf-8').decode(new Uint8Array(chat.name));
    expect(name.startsWith('Test Chat')).toBeTruthy(); // [u8; 280] => trailing zeros.
    expect(chat.messages.length).toEqual(33607);
    expect(chat.head.toNumber()).toEqual(0);
    expect(chat.tail.toNumber()).toEqual(0);
  });

  it('Creates a user', async () => {
    const authority = payer.publicKey;
    const [user] = await PublicKey.findProgramAddress(
      [authority.toBuffer()],
      program.programId
    );
    await program.rpc.createUser('My User', {
      accounts: {
        user,
        authority,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    });
    const account = await program.account.user.fetch(user);
    expect(account.name).toEqual('My User');
    expect(account.authority.equals(authority)).toBeTruthy();
  });

  it('Sends messages', async () => {
    const authority = payer.publicKey;
    const user = (
      await PublicKey.findProgramAddress(
        [authority.toBuffer()],
        program.programId
      )
    )[0];

    // Only send a couple messages so the test doesn't take an eternity.
    const numMessages = 10;

    // Generate random message strings.
    const messages = new Array(numMessages).fill('').map(() => {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    });

    // Send each message.
    for (let k = 0; k < numMessages; k += 1) {
      console.log('Sending message ' + k);
      await program.rpc.sendMessage(messages[k], {
        accounts: {
          user,
          authority,
          chatRoom: chatRoom.publicKey,
        },
      });
    }

    // Check the chat room state is as expected.
    const chat = await program.account.chatRoom.fetch(chatRoom.publicKey);
    const name = new TextDecoder('utf-8').decode(new Uint8Array(chat.name));
    expect(name.startsWith('Test Chat')).toBeTruthy(); // [u8; 280] => trailing zeros.
    expect(chat.messages.length).toEqual(33607);
    expect(chat.head.toNumber()).toEqual(numMessages);
    expect(chat.tail.toNumber()).toEqual(0);
    chat.messages.forEach((msg, idx) => {
      if (idx < 10) {
        const data = new TextDecoder('utf-8').decode(new Uint8Array(msg.data));
        console.log('Message', data);
        expect(msg.from.equals(user)).toBeTruthy();
        expect(data.startsWith(messages[idx])).toBeTruthy();
      } else {
        expect(JSON.stringify(msg.data)).toEqual(
          JSON.stringify(new Array(280).fill(0))
        );
      }
    });
  });
});
