const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    description: String,
    amount: Number,
    type: String,
    category: String,
    comment: String,
    accountId: { type: mongoose.Schema.ObjectId, ref: 'Account' },
    balance: Number,
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.accountId;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
