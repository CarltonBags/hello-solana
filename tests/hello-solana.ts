import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloSolana } from "../target/types/hello_solana";

describe("hello-solana", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const dataAccount = anchor.web3.Keypair.generate();

  const program = anchor.workspace.HelloSolana as Program<HelloSolana>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .new()
      .accounts({ dataAccount: dataAccount.publicKey })
      .signers([dataAccount])
      .rpc();
    console.log("Your transaction signature", tx);

    const val1 = await program.methods
      .get()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view();

    console.log("state", val1);

    await program.methods
      .flip()
      .accounts({ dataAccount: dataAccount.publicKey })
      .rpc();

    const val2 = await program.methods
      .get()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view();

    console.log("state", val2);  });
});
