const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const tokenValidation = require('../middleware/tokenValidation');

router.post('/create', accountController.createAccount);

router.post(
  '/user-accounts',
  tokenValidation.validateToken,
  accountController.getUserAccounts
);

router.post(
  '/:id/transactions',
  tokenValidation.validateToken,
  accountController.getAccountTransactions
);

module.exports = router;
