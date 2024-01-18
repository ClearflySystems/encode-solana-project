import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Blocktowin } from "../target/types/blocktowin";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

describe("Buy Tickets", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.Blocktowin as Program<Blocktowin>;

    const owner = anchor.web3.Keypair.generate();
    console.log("Local owner is: ", owner.publicKey.toBase58());

    const signer = anchor.web3.Keypair.generate();
    console.log("Local signer is: ", signer.publicKey.toBase58());

    const connection = anchor.getProvider().connection;

    it("get current competitions", async () => {
        const comps = await program.account.competitionModel.all();
        console.log("Your Competitions", comps);

        // get first competition - debug some info
        let  mycomp = '';
        comps.forEach( comp => {
            if(comp.account.idx == 1){
                mycomp = comp.publicKey.toBase58();

                console.log(`Pool Prize ${ comp.account.poolprize.toNumber() }` );
                console.log(`Entry costs ${ comp.account.entrycost.toNumber() }` );
                console.log(`Total tickets ${ comp.account.totaltickets.toNumber() }` );
                console.log(`Sold tickets ${ comp.account.soldtickets.toNumber() }` );
                console.log(`Max  entries ${ comp.account.maxentries.toNumber() }` );
                console.log(`Open date ${ new Date( comp.account.opendate.toNumber() ).toISOString() }` );
                console.log(`Close date ${ new Date( comp.account.closedate.toNumber() ).toISOString() }` );

            }
        });

        // call buy tickets
        tx = await program.methods.buyTickets(mycomp, 200).accounts({

        }).signers([signer]).rpc();
        

      });

});