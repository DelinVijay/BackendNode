// const fs=require('fs');
// const filename="./src/expense.json";
// const readusers=(req,res)=>{
//     res.send("Read Users");
// }
// const readusersp=(req,res)=>{
//     //console.log(req.query);
//     const {id}=req.query;
//     try{
//     const data = fs.readFileSync(filename,"utf-8");
//     const newdata = JSON.parse(data);
//     const user = newdata.find(user => user.id === id);
//     if(user)
//         res.status(200).json({"data":user,"message":"","err":""});
//     else
//         res.status(400).json({"data":"","message":"no user with that id","err":""});
//     }catch(err){
//         res.status(500).json({"data":"","message":"","err":err.message}); 
//     }
// }
// const createuser=(req,res)=>{
//     console.log(req.body);
//     try{
//         let data = req.body;
//         let users = fs.readFileSync(filename,"utf-8");
//         users = JSON.parse(users);
//         let newusers = users.filter(user => user.id === data.id);
//         if(newusers.length > 0){
//             res.status(400).son({"data":"","message":"already exists","err":""});
//         }
//         else{
//             users.push(data);
//             fs.writeFileSync(filename,JSON.stringify(users));
//             res.status(200).json({"data":"","message":"added success","err":""});
//         }
//     }catch(err){
//         res.status(500).json({"data":"","message":"","err": err.message });
//     }
// }
// const update=(req,res)=>{
//     try{
//         const datas = req.body;
//         let data = fs.readFileSync(filename,"utf-8");
//         data = JSON.parse(data);
//         const index = data.findIndex(user => user.id === datas.id);
//         data[index] = { ...data[index], ...datas };
//         fs.writeFileSync(filename,JSON.stringify(data));

//         res.status(200).json({"data":"","message":"update succss","err":""});
//     }catch(err){
//         res.status(500).json({"data":"","message":"","err":err.message}); 
//     } 
// }
// const deleteDetails=(req,res)=>{
//     try{
//         let id=req.params.id;
//         let data = fs.readFileSync(filename,"utf-8");
//         let resultData = JSON.parse(data).filter(v => v.id !== id);
//         if (Object.keys(resultData).length !== 0) {
//             fs.writeFileSync(filename, JSON.stringify(resultData));
//             res.status(200).json({"data":"","msg":"delete success","err":""});
//         } else {
//             res.status(400).json({"data":"","msg":"","err":"delete failed"});
//         }
//     }
//     catch(err){
//         res.status(500).json({"data":"","msg":"","err":err.message});
//     }
// }
// module.exports={
//     readusers,
//     readusersp,
//     createuser,
//     update,
//     deleteDetails
// }