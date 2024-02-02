const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    hash = SHA256(JSON.stringify(block = {
        "id" : blocks.length,
        "transactions" : mempool.slice(0, MAX_TRANSACTIONS),
        "nonce" : 0
    }));

    nonce = 0;

    do {
        hash = SHA256(JSON.stringify(block = {
        "id" : blocks.length,
        "transactions" : mempool.slice(0, MAX_TRANSACTIONS),
        "nonce" : nonce
        }));
        nonce++;
    } while (BigInt(`0x${hash}`) > TARGET_DIFFICULTY);

    block.hash = hash;
    blocks.push(block);
    mempool.splice(0, MAX_TRANSACTIONS);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};
