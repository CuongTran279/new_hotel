const express = require('express');
const cors = require('cors');
const connect = require('./connect')

const port = process.env.DB_PORT || 5000 
const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    const sql = 'SELECT * FROM users';
    connect.query(sql,(err,result)=>{
        if(err){
            res.json({err: err.message});
        }else{
            res.json(result);
        }
    })
})

app.post('/signUp',(req,res)=>{
    const sql = 'INSERT INTO users(email, name, pass, phone, address) VALUES (?)';
    const values = [
        req.body.email,
        req.body.name,
        req.body.pass,
        req.body.phone,
        req.body.address
    ]
    connect.query(sql,[values],(err,result)=>{
        if(err){
            return res.json({err: err.message});
        }
        return res.json(result);
    })
})

app.listen(port,()=>{
    console.log("Server is running on "+port);
})