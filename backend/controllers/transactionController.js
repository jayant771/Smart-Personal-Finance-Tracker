const Transaction = require('../models/Transaction');
const mongoose = require("mongoose");

// Add transaction
const addTransaction = async (req, res) => {
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

// Get user transactions
const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
  res.status(200).json(transactions);
};

// Delete transaction
const deleteTransaction = async (req, res) => {
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

// Analytics API
const getAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const analytics = await Transaction.aggregate([
      {
        $match: {
          userId,
          type: "expense" // Optional filter
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            category: "$category"
          },
          total: { $sum: "$amount" }
        },
      },
      {
        $sort: { "_id.month": 1 }
      }
    ]);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const formatted = {};

    analytics.forEach(item => {
      const monthName = monthNames[item._id.month - 1];
      const category = item._id.category;

      if (!formatted[monthName]) {
        formatted[monthName] = [];
      }

      formatted[monthName].push({
        category,
        total: item.total
      });
    });

    const result = Object.entries(formatted).map(([month, categories]) => ({
      month,
      categories
    }));

    res.status(200).json({ monthlyAnalytics: result });

  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ error: "Server error while generating analytics" });
  }
};


module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getAnalytics,
};
