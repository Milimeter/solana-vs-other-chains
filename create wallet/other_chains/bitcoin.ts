import bitcoin from 'bitcoinjs-lib';
import bip39 from "bip39";
import * as bip32 from 'bip32';
import ecc from "@bitcoinerlab/secp256k1";
import { ECPairFactory } from "ecpair";


const ECPair = ECPairFactory(ecc);
const mnemonic = bip39.generateMnemonic();
const seed = await bip39.mnemonicToSeed(mnemonic);
const path = "m/84'/0'/0'/0/0";
const btcNetwork = bitcoin.networks.bitcoin;
const masterNode = bip32.BIP32Factory(ecc).fromSeed(seed, btcNetwork);
const childNode = masterNode.derivePath(path);
const btcPrivateKey = childNode.toWIF();
const keyPair = ECPair.fromWIF(btcPrivateKey, btcNetwork);

const bitcoinAddress = bitcoin.payments.p2wpkh({

   //pubke: keyPair.publicKey.buffer,
    network: btcNetwork,
    pubkey: keyPair.publicKey as Buffer<ArrayBufferLike>,
  }).address!;

console.log('Address:', bitcoinAddress);
console.log('Mnemonic:', mnemonic);
console.log('Private Key:', btcPrivateKey);
