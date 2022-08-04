const Transaction = require('../database/models/transactionModel');
const Account = require('../database/models/accountModel');
const jwt = require('jsonwebtoken');

module.exports.createTransaction = async (serviceData) => {
  try {
    const account = await Account.findOne({ _id: serviceData.accountId });
    const newBalance = account.balance + serviceData.amount;

    const newTransaction = new Transaction({
      description: serviceData.description,
      amount: serviceData.amount,
      type: serviceData.type,
      category: serviceData.category,
      comment: serviceData.comment,
      accountId: serviceData.accountId,
      balance: newBalance,
    });

    let result = await newTransaction.save();

    if (!account) {
      throw new Error('Account not found!');
    }

    account.balance = newBalance;

    await account.save();

    return result.toObject();
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.updateTransactionCategory = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split('Bearer')[1]
      .trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const account = await Account.findOne({
      _id: serviceData.body.accountId,
      userId: decodedJwtToken.id,
    });

    if (!account) {
      throw new Error('Account not found!');
    }

    let transaction = await Transaction.findOne({ _id: serviceData.params.id });

    transaction.category = serviceData.body.category;

    transaction.save();

    return transaction;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.updateTransactionComment = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split('Bearer')[1]
      .trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const account = await Account.findOne({
      _id: serviceData.body.accountId,
      userId: decodedJwtToken.id,
    });

    if (!account) {
      throw new Error('Account not found!');
    }

    let transaction = await Transaction.findOne({ _id: serviceData.body._id });

    transaction.comment = serviceData.body.comment;

    transaction.save();

    return transaction;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};
