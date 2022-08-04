const Account = require('../database/models/accountModel');
const User = require('../database/models/userModel');
const Transaction = require('../database/models/transactionModel');
const jwt = require('jsonwebtoken');

module.exports.createAccount = async (serviceData) => {
  try {
    const newAccount = new Account({
      name: serviceData.name,
      number: serviceData.number,
      type: serviceData.type,
      description: serviceData.description,
      userId: serviceData.userId,
    });

    let result = await newAccount.save();

    return result.toObject();
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.getUserAccounts = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split('Bearer')[1]
      .trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      throw new Error('User not found!');
    }

    const accounts = await Account.find({ userId: user._id });

    return accounts;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.getAccountTransactions = async (serviceData) => {
  const accountId = serviceData.params.id;
  try {
    const jwtToken = serviceData.headers.authorization
      .split('Bearer')[1]
      .trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      throw new Error('User not found!');
    }

    const account = await Account.find({ _id: accountId, userId: user._id });

    if (!account) {
      throw new Error('Account not found!');
    }

    const transactions = await Transaction.find({ accountId }).sort({
      createdAt: -1,
    });

    return transactions;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};
