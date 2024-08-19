
const { readuser } = require('./expenseModule');
const http = require('http');

http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    switch(req.url){
        case '/readusers':
            readuser(req,res);
            break;
        case  './deleteuser':
           break;
        default:
            res.write("No Routes");
            res.end();
            break;
    }
}).listen(4000,()=>console.log("Running"));