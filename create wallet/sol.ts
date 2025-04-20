import { Keypair } from '@solana/web3.js';

const keypair = Keypair.generate();

console.log('Public Key:', keypair.publicKey.toBase58());
console.log('Secret Key:', Buffer.from(keypair.secretKey).toString('hex'));


/* 

---

### 📌 **Concept**
- **Solana Wallet Creation**: A wallet on Solana consists of a **public key** (your wallet address) and a **private/secret key** (used to sign transactions).
- This code creates a **new wallet (keypair)** programmatically using the Solana Web3 JavaScript SDK.

---

### 🧠 **How It Works (Algorithm & Flow)**
   import { Keypair } from '@solana/web3.js';
   - Brings in the `Keypair` utility from Solana’s SDK.
   - `Keypair` handles creation of new cryptographic keypairs using **Ed25519**.

2. **Generate Keypair**
   const keypair = Keypair.generate();
   ```
   - Internally:
     - Uses **Ed25519 elliptic curve cryptography**.
     - Randomly generates a 64-byte secret key.
     - The first 32 bytes are the private key (seed), and the last 32 bytes are the public key.

3. **Print Public Key**
   console.log('Public Key:', keypair.publicKey.toBase58());

   - `publicKey` is encoded in **Base58**, a human-friendly encoding used widely in crypto.
   - This is your **wallet address** on Solana.

4. **Print Secret Key**
   console.log('Secret Key:', Buffer.from(keypair.secretKey).toString('hex'));

   - `secretKey` is a `Uint8Array` of 64 bytes.
   - Converted to a **hex string** for readability.
   - This full 64-byte key is required to sign transactions (like sending SOL or interacting with programs).

---

### 🔐 **Important Notes**
- The **private key must be kept secure**. If exposed, anyone can access the funds in the wallet.
- This type of keypair is used for **offline signing**, **programmatic wallets**, or **testing/dev environments**.
- Production apps usually use a **wallet provider** (e.g., Phantom, Backpack) instead of generating raw keypairs.

*/