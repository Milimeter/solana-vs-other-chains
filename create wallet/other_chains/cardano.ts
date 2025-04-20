import * as CardanoWasm from '@emurgo/cardano-serialization-lib-nodejs';
import { generateMnemonic, mnemonicToEntropy } from 'bip39';

const mnemonic = generateMnemonic(24);
const entropy = Buffer.from(mnemonicToEntropy(mnemonic), 'hex');
const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(entropy, Buffer.from(''));
const privateKey = rootKey.to_raw_key();
const publicKey = privateKey.to_public().to_hex();

console.log('Mnemonic:', mnemonic);
console.log('Public Key:', publicKey);
