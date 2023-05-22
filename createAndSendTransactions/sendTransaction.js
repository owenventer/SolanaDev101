
const solanaWeb3 = require("@solana/web3.js");
const connection = new solanaWeb3.Connection(
    "https://rpc-devnet.helius.xyz/?api-key=<api_key>",
    'confirmed',
  );

const sender=solanaWeb3.Keypair.fromSecretKey(new Uint8Array([61,155,131,194,164,104,243,153,197,74,84,107,225,184,5,40,64,186,91,10,132,193,118,98,124,40,90,79,117,200,183,226,10,121,246,225,15,12,144,58,143,127,191,39,191,101,85,219,28,31,4,228,83,122,178,22,212,16,220,211,137,100,60,49]));

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