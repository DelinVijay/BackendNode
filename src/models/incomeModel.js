const mongoose=require('mongoose');
const Schema=require('mongoose').Schema;
const incomeSchema=new Schema(
   [ {
    "income":Number,
    "date":Date,
     }
]
);
const incomeModel=mongoose.model("incomes",incomeSchema);
module.exports=incomeModel;
