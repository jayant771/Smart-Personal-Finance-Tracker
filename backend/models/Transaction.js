const mongoose = require("mongoose") 

const transactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
      },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    
});

module.exports = mongoose.model('Transaction', transactionSchema);