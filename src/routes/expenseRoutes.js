const router = require('express').Router();
const expenseController = require('../controller/expenseExpressController');

// Expense routes
router.get('/readExpense', expenseController.readExpense);
router.get('/readSpecificExpense', expenseController.readSpecificExpense);
router.post('/createExpense', expenseController.createExpense);
router.put('/updateExpense', expenseController.updateExpense);
router.delete('/deleteExpense/:item', expenseController.deleteExpense); // Changed from `id` to `item`

// Income routes (Add these if you haven't already)
router.post('/createIncome', expenseController.createIncome); // Ensure this endpoint exists in your controller
router.get('/readIncome', expenseController.readIncome); // Ensure this endpoint exists in your controller

module.exports = router;
