# Verifying provably fair games

### Prerequisites

#### NodeJS

Install nodejs's LTS. 8.11.4 at the time of writing.

### How to use

This is very simple, you just run
```
node testgame.js [secret_seed_plaintext] [txid] [vout_index]
```
The daily secret seed can be found here:
https://www.satoshidice.com/fair/
And the hash is published on the BCH blockchain every day.

Anyone can verify that the secret's hash was written to the blockchain a few days before it was used, so anyone acna verify it wasn't modified.

The game outcome is only based on the secret seed, the txid and the vout index.
