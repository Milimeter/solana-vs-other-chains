
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

const client = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

// Generate a new Ed25519 Keypair
const keypair = new Ed25519Keypair();

// Get the public key
const publicKey = keypair.getPublicKey().toString();
// Get the secret key
const secretKey = Buffer.from(keypair.getSecretKey()).toString('hex');
