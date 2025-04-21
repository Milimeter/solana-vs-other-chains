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


/* 


### 📌 **Concept**
This script generates a **Bitcoin wallet** using:
- A **mnemonic** (BIP39)
- A **seed** (BIP32)
- A **derivation path** (BIP84 for native SegWit/P2WPKH)
- Outputs the **address**, **private key (WIF format)**, and **mnemonic**

---

### 🧠 **How It Works (compared to Solana)**

| Step | 🟡 **Bitcoin (via `bitcoinjs-lib`)** | 🟣 **Solana (via `@solana/web3.js`)** |
|------|-------------------------------------|--------------------------------------|
| **1. Mnemonic** | Uses `bip39.generateMnemonic()` (12/24 words) | No native mnemonic |
| **2. Seed Generation** | Converts mnemonic to seed with `mnemonicToSeed()` | No seed/mnemonic — just generates random keypair |
| **3. Derivation** | Uses `bip32` with hardened path: `m/84'/0'/0'/0/0` (BIP84) | No derivation path or account structure |
| **4. Network Config** | Defines mainnet via `bitcoin.networks.bitcoin` | Solana defaults to mainnet/testnet via cluster config |
| **5. Key Derivation** | Derives a child private key using BIP32 | Directly uses `Keypair.generate()` |
| **6. Private Key Format** | Exported in WIF (Wallet Import Format) | 64-byte hex string (private + public keys) |
| **7. Address Format** | `p2wpkh` → Native SegWit bech32 address (starts with `bc1...`) | Public key is the Base58 address |

---

### ✅ **Code Explanation**

```ts
import bitcoin from 'bitcoinjs-lib';
import bip39 from "bip39";
import * as bip32 from 'bip32';
import ecc from "@bitcoinerlab/secp256k1";
import { ECPairFactory } from "ecpair";
```
- Loads required libraries for Bitcoin key generation, derivation, and elliptic curve math using `secp256k1`.

---

const ECPair = ECPairFactory(ecc);
const mnemonic = bip39.generateMnemonic(); // Step 1: 12/24 word mnemonic
const seed = await bip39.mnemonicToSeed(mnemonic); // Step 2: Convert mnemonic to seed

---

const path = "m/84'/0'/0'/0/0"; // Step 3: BIP84 derivation (native SegWit, first address)
const btcNetwork = bitcoin.networks.bitcoin; // Step 4: Define mainnet config
const masterNode = bip32.BIP32Factory(ecc).fromSeed(seed, btcNetwork); // Step 5: Generate root node
const childNode = masterNode.derivePath(path); // Step 6: Derive child key from path

---

const btcPrivateKey = childNode.toWIF(); // Step 7: Convert to WIF format (for wallet import)
const keyPair = ECPair.fromWIF(btcPrivateKey, btcNetwork); // Step 8: Create usable key pair


---

const bitcoinAddress = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey as Buffer<ArrayBufferLike>,
  network: btcNetwork,
}).address!;

- Step 9: Generate **native SegWit address** using **Pay-to-Witness-Public-Key-Hash (P2WPKH)**.
- The result is a `bc1...` address (used in modern wallets like BlueWallet, Sparrow, etc).

---


console.log('Address:', bitcoinAddress);
console.log('Mnemonic:', mnemonic);
console.log('Private Key:', btcPrivateKey);


---

### 🔐 **Key Differences: Bitcoin vs Solana**

| Feature | Bitcoin (this script) | Solana |
|--------|------------------------|--------|
| Curve | `secp256k1` | `ed25519` |
| Mnemonic Support | ✅ Native with BIP39 | ❌ Not native |
| Derivation Path | BIP84: `m/84'/0'/0'/0/0` | No derivation |
| Private Key Format | WIF (base58 w/ checksum) | 64-byte Uint8Array (Hex) |
| Address Format | `bc1...` (bech32 - SegWit) | Base58 public key |
| Address Scheme | P2WPKH (SegWit) | PubKey = Address |

---


*/