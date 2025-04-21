import algosdk from 'algosdk';

const account = algosdk.generateAccount();

console.log('Address:', account.addr);
console.log('Mnemonic:', algosdk.secretKeyToMnemonic(account.sk));

/* 


---

### 📌 **Concept**
- This code creates a new **Algorand account (wallet)**, which includes:
  - A **public address** (used to receive ALGO or tokens).
  - A **secret key** (used to sign transactions).
  - A **mnemonic** (25-word phrase that can restore the account).

---

### 🧠 **How It Works (Algorithm & Flow)**

1. **Import Algorand SDK**
   import algosdk from 'algosdk';

   - Brings in Algorand JavaScript SDK.
   - Provides tools for generating accounts, signing transactions, encoding/decoding, etc.

2. **Generate Account**
   const account = algosdk.generateAccount();
   - Internally:
     - Generates an **Ed25519 keypair** (same cryptographic standard used by Solana).
     - `account.sk` = secret key (64 bytes).
     - `account.addr` = public Algorand address (derived from the public key).

3. **Print Address**
   console.log('Address:', account.addr);

   - Outputs the **Algorand public address**, used to receive assets or check balance on the blockchain.

4. **Convert Secret Key to Mnemonic**
   console.log('Mnemonic:', algosdk.secretKeyToMnemonic(account.sk));
   - Converts the secret key into a **25-word mnemonic phrase**.
   - This is a human-readable backup that can **re-generate the exact same account** later using `mnemonicToSecretKey()`.

---

### 🔐 **Important Notes**
- The **mnemonic phrase must be kept secure**—it can be used to fully restore the wallet.
- Algorand uses **mnemonics natively**, making account backups more user-friendly.
- Mnemonics encode both private key + checksum, ensuring secure and accurate recovery.

---

### 📎 Comparison to Solana Example
| Feature             | Solana                            | Algorand                         |
|---------------------|-----------------------------------|----------------------------------|
| Cryptography        | Ed25519                           | Ed25519                          |
| Public Key Format   | Base58                            | Base32 (Algorand address format) |
| Secret Key Format   | 64-byte hex                       | 25-word mnemonic                 |
| SDK Utility         | `Keypair.generate()`              | `algosdk.generateAccount()`      |
| Human Recovery Key  | ❌ (manual backup of secret key)   | ✅ (mnemonic phrase)             |


*/