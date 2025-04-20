import algosdk from 'algosdk';

const account = algosdk.generateAccount();

console.log('Address:', account.addr);
console.log('Mnemonic:', algosdk.secretKeyToMnemonic(account.sk));
