const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    name: String,
    number: Number,
    type: String,
    description: String,
    balance: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.userId;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Account', accountSchema);
