class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute() {
        if(this.inputUTXOs.some(function(inputUTXO){
            return inputUTXO.spent === true;
        })){
            throw new Error('An input TXO is already spent.')
        }
        
        const sumInputUTXOs = this.inputUTXOs.reduce((sum, inputUTXO) => sum + inputUTXO.amount, 0);
        const sumOutputUTXOs = this.outputUTXOs.reduce((sum, outputUTXO) => sum + outputUTXO.amount, 0);
        if (sumOutputUTXOs > sumInputUTXOs) {
            throw new Error('Sum of input TXOs dont cover sum of output TXOs.')
        }

        this.inputUTXOs.map(inputUTXO => inputUTXO.spent = true);
        this.fee = sumInputUTXOs - sumOutputUTXOs
    }
}

module.exports = Transaction;