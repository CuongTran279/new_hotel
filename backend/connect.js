require('dotenv').config();
const mysql = require('mysql')

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

connect.connect((err)=>{
    if(err){
        console.log("Kết nối thất bại : "+ err.stack);
        return;
    }else{
        console.log("Kết nối ĐB thành công "+connect.threadId);
    }
});

module.exports = connect;