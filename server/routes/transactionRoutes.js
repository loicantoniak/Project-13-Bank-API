const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const tokenValidation = require('../middleware/tokenValidation');

router.post('/create', transactionController.createTransaction);

router.patch(
  '/:id/category',
  tokenValidation.validateToken,
  transactionController.updateTransactionCategory
);

router.patch(
  '/:id/comment',
  tokenValidation.validateToken,
  transactionController.updateTransactionComment
);

module.exports = router;
