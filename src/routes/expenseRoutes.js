const router = require('express').Router();

const expenseController=require('../controller/expenseExpressController');
router.get('/readExpense',expenseController.readExpense);
router.get('/readSpecificExpense',expenseController.readSpecificExpense);
router.post('/createExpense',expenseController.createExpense);
router.put('/updateExpense',expenseController.updateExpense);
router.delete('/deleteExpense/:id',expenseController.deleteExpense)

module.exports=router;