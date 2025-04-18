const Transaction = require('../models/Transaction');

// @descrioption Add transaction

exports.addTransaction = async (req, res) => {
  const { type, amount, category, note } = req.body;

  if (!type || !amount || !category) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const transaction = new Transaction({
    userId: req.user.id,
    type,
    amount,
    category,
    note,
  });

  await transaction.save();
  res.status(201).json(transaction);
};

// @descrioption Get user transactions

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
  res.status(200).json(transactions);
};

// @descrioption Delete transaction

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findOneAndDelete({
    _id: id,
    userId: req.user.id,
  });

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  res.status(200).json({ message: 'Transaction deleted' });
};
