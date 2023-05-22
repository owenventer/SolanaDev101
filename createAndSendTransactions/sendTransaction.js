
const solanaWeb3 = require("@solana/web3.js");
const connection = new solanaWeb3.Connection(
    "https://rpc-devnet.helius.xyz/?api-key=<api_key>",
    'confirmed',
  );

const sender=solanaWeb3.Keypair.fromSecretKey(new Uint8Array([61,...60,49]));

// Set the address that will receive the SOL
const to = new solanaWeb3.PublicKey("86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY");

(async () => {
  
    // Create a transaction
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: sender.publicKey,
          toPubkey: to,
          lamports: solanaWeb3.LAMPORTS_PER_SOL * 0.01,
        }),
      );
    
      // Sign and confirm the transaction
      const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [sender],
      );
      console.log('SIGNATURE', signature);
})()