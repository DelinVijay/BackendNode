const mongoose=require('mongoose');
const Schema=require('mongoose').Schema;



const expenseSchema=new Schema(
   [ 
     {
      "income":Number,
      "date":Date
     },
     {
      "item":String,
      "price":Number,
      "date":Date
    },

]
);

const expenseModel=mongoose.model("expenses",expenseSchema);

module.exports=expenseModel;
