const fs = require('fs');

function createuser(){
    try{
        let data = {
            "id":"4",
            "name":"super",
            "phone":123,
            "email":"abc@gmail.com"
        }
        let users = fs.readFileSync("./expense.json","utf-8");
        users = JSON.parse(users);
        let newusers = users.filter(user => user.id === data.id);
        if(newusers.length > 0){
            console.log("already exist");
        }
        else{
            users.push(data);
            fs.writeFileSync("./expense.json",JSON.stringify(users));
            console.log({"data":"","message":"added success","err":""});
        }
    }catch(err){
        console.log({"data":"","message":"","err": err.message });
    }
}



function deleteDetails(id) {
    try{
        let data = fs.readFileSync("./expense.json","utf-8");
        let resultData = JSON.parse(data).filter(v => v.id !== id);
        if (Object.keys(resultData).length !== 0) {
            fs.writeFileSync("./details.json", JSON.stringify(resultData));
            console.log({"data":"","msg":"delete success","err":""});
        } else {
            console.log({"data":"","msg":"","err":"delete failed"});
        }
    }
    catch(err){
        console.log({"data":"","msg":"","err":err.message});
    }
    
}



function readusers(req,res){
    try{
        fs.readFile("./expense.json","utf-8",(err,data)=>{
            if(err) 
                console.log(err);
            else{
                res.write(data);
                res.end();
            }

        })
    }catch(err){
        console.log(({"data":"","message":"","err":err.message}));
    }
}

function readusersp(){
    try{
        let key=2;
        const data = fs.readFileSync("./expense.json","utf-8");
    const newdata = JSON.parse(data);
    const user = newdata.find(user => user.id === key);
    if(user)
        console.log("details of user is",user);
    else
        console.log("no user with thet id");
    }catch(err){
        console.log({"data":"","message":"","err":err.messgae}); 
    }
}
function update(key,name){
    try{
        console.time();
        let data = fs.readFileSync("./expense.json","utf-8");
        data = JSON.parse(data);
        const index = data.findIndex(user => user.id === key);
        data[index] = { ...data[index], ...name };
        fs.writeFileSync("./expense.json",JSON.stringify(data));
        console.timeEnd();
    }catch(err){
        console.log({"data":"","message":"","err":err.messgae}); 
    } 
}


module.exports = {
    update,
    createuser,
    readusersp,
    readusers,
    deleteuser,
}