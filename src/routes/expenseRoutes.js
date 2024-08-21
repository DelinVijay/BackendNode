const router = require('express').Router();
const expenseController = require('../controller/expenseExpressController');

// Expense routes
router.get('/readExpense', expenseController.readExpense);
router.get('/readSpecificExpense', expenseController.readSpecificExpense);
router.post('/createExpense', expenseController.createExpense);
router.put('/updateExpense', expenseController.updateExpense);
router.delete('/deleteExpense', expenseController.deleteExpense); 
router.delete('/deleteIncome', expenseController.deleteIncome);
router.post('/createIncome', expenseController.createIncome); 
router.get('/readIncome', expenseController.readIncome);

module.exports = router;
