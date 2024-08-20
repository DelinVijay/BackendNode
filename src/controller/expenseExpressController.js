
const expenseModel=require('../models/expenseModel')
const expenseModel=require('../models/incomeModel')

const readExpense=async (req,res)=>{
    try{
    let expense = await expenseModel.find();
    (expense.length>0)?
        res.status(200).json({"data":expense,"message":"","err":""})
    :
        res.status(400).json({"data":"","message":"no user with that id","err":""});
    }catch(err){
        console.log({"data":"","msg":"","err":err.message})
        res.status(500).json({"data":"","message":"","err":err.message}); 
    }
}
const readIncome=async (req,res)=>{
    try{
    let income = await incomeModel.find();
    (income.length>0)?
        res.status(200).json({"data":income,"message":"","err":""})
    :
        res.status(400).json({"data":"","message":"no user with that id","err":""});
    }catch(err){
        console.log({"data":"","msg":"","err":err.message})
        res.status(500).json({"data":"","message":"","err":err.message}); 
    }
}
const readSpecificExpense=async (req,res)=>{
    try{
    let expense = await expenseModel.find({"item":req.query.item});
    (expense.length>0)?
        res.status(200).json({"data":expense,"message":"","err":""})
    :
        res.status(400).json({"data":"","message":"no user with that id","err":""});
    }catch(err){
        console.log({"data":"","msg":"","err":err.message})
        res.status(500).json({"data":"","message":"","err":err.message}); 
    }
}
const createExpense=async(req,res)=>{
    try{
        let data = req.body;
        console.log(data);
        let expense = new expenseModel(data);
        await expense.save();
        res.status(201).json({"data":"","message":"added success","err":""});
    }
    catch(err){
        console.log({"data":"","msg":"","err":"hihihih"})
        res.status(500).json({"data":"","message":"","err": err.message });
    }
}
const createIncome=async(req,res)=>{
    try{
        let data = req.body;
        console.log(data);
        let income = new incomeModel(data);
        await income.save();
        res.status(201).json({"data":"","message":"added success","err":""});
    }
    catch(err){
        console.log({"data":"","msg":"","err":"hihihih"})
        res.status(500).json({"data":"","message":"","err": err.message });
    }
}
const updateExpense=async(req,res)=>{
    try{
        let data = req.body;
        let expense=await expenseModel.updateOne({"item":data.item},{$set: data});
        (expense.modifiedCount>0)? 
        res.status(200).json({"data":"","message":"update success","err":""}):
        res.status(404).json({"data":"","message":"No expense Found","err": "" });
    }catch(err){
        res.status(500).json({"data":"","message":"","err":err.message}); 
    } 
}
const deleteExpense=async(req,res)=>{
    try{
        let expense = await expenseModel.deleteOne({"item":req.params.item});
        (expense.deletedCount > 0) 
        ?
            res.status(200).json({"data":"","msg":"delete success","err":""})
        :
            res.status(404).json({"data":"","msg":"No expense found","err":""});
        }
    catch(err){
        res.status(500).json({"data":"","msg":"","err":err.message});
    }
}
module.exports={
    readExpense,
    readIncome,
    readSpecificExpense,
    createExpense,
    createIncome,
    updateExpense,
    deleteExpense,
}
