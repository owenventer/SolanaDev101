const { Keypair, Connection } = require("@solana/web3.js");
const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
} = require("@metaplex-foundation/js");
const fs = require("fs");

// Create connection and wallet
const connection = new Connection(
  "https://rpc.helius.xyz/?api-key=<api_key>",
  "confirmed"
);
const wallet = Keypair.fromSecretKey(
  new Uint8Array([
    61, 155, ..., 60, 49,
  ])
);
// Log the wallet public key
console.log("Public Key:", wallet.publicKey.toBase58());

// Create Metaplex instance
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

async function createMetadata(imageName) {
  // Create an image buffer
  const metadataURI = await metaplex.nfts().uploadMetadata({
    name: "Helius NFT",
    description: "Helius NFT created in the SolanaDev 101 course",
    // Image: await uploadIMG(imageName),
    image: await toMetaplexFile(fs.readFileSync(imageName), "heliusLogo"),
    attributes: [
      { trait_type: "Test", value: "Yes" },
      { trait_type: "Logo", value: "Helius" },
    ],
  });
  return metadataURI;
}

async function createNFT() {
  // Create and upload the metadata
  const metadata = await createMetadata("./heliusLogo.png");
  // Create the NFT
  const nft = await metaplex.nfts().create({
    uri: metadata.uri,
    name: "Helius NFT",
    seller_fee_basis_points: 500, // 5%
    creators: [{ address: wallet.publicKey, verified: true, share: 100 }],
  });

  // Log the NFT mint address
  console.log("NFT:", nft.mintAddress.toBase58());
}

createNFT();
