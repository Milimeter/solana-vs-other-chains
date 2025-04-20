import { KeyPair } from 'near-api-js';

const keypair = KeyPair.fromRandom('ed25519');

console.log('Public Key:', keypair.getPublicKey().toString());
