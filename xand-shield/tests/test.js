import {
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  Keypair,
} from '@solana/web3.js';
import fs from 'fs';
import path from 'path';
import os from 'os';
import yaml from 'js-yaml'; // Install using `npm install js-yaml`

(async () => {
  try {
    // Setup Solana connection
    const connection = new Connection('http://api.trynet.xandeum.com:8899', 'confirmed'); // Adjust for your localnet or testnet

    // Load the program ID
    const programId = new PublicKey('xSHLJPXU8QW3A9kGiRoL94bksJ7ZZPY4dUwJPAT8CVK');

    // Debug: Check Solana CLI config file location
    const configPath = path.join(os.homedir(), '.config', 'solana', 'cli', 'config.yml');
    if (!fs.existsSync(configPath)) {
      throw new Error(`Solana CLI config not found at ${configPath}`);
    }

    // Parse the YAML config file
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    // Debug: Ensure keypair_path exists in the config
    if (!config.keypair_path) {
      throw new Error('Keypair path is not defined in the Solana CLI config file.');
    }

    // Resolve wallet keypair path
    const walletPath = config.keypair_path;
    if (!fs.existsSync(walletPath)) {
      throw new Error(`Wallet keypair not found at ${walletPath}`);
    }

    // Load the wallet keypair
    const payer = Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(fs.readFileSync(walletPath, 'utf8')))
    );

    console.log(`Using wallet: ${payer.publicKey.toBase58()}`);

    // Create a transaction to invoke the xand-shield program
    const transaction = new Transaction().add({
      keys: [],
      programId: programId,
      data: Buffer.alloc(0), // No data passed to the program
    });

    console.log('Sending transaction...');
    const txSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);
    console.log('Transaction confirmed:', txSignature);
  } catch (error) {
    console.error('Transaction failed as expected:');
    console.error(error.message); // Log the error message
  }
})();
