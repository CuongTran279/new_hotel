const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connect = require('./connect');

const port = process.env.DB_PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Tạo thư mục upload nếu nó chưa tồn tại
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// Cấu hình lưu trữ và tên file cho multer

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    connect.query(sql, (err, result) => {
        if (err) {
            res.json({ err: err.message });
        } else {
            res.json(result);
        }
    });
});

app.post('/signUp', (req, res) => {
    const sql = 'INSERT INTO users(email, name, pass, phone, address) VALUES (?)';
    const values = [req.body.email, req.body.name, req.body.pass, req.body.phone, req.body.address];
    connect.query(sql, [values], (err, result) => {
        if (err) {
            return res.json({ err: err.message });
        }
        return res.json(result);
    });
});

app.post('/signIn', (req, res) => {
    const sql = 'SELECT * FROM users WHERE `name` = ? AND `pass` = ?';
    connect.query(sql, [req.body.name, req.body.pass], (err, result) => {
        if (err) {
            return res.json({ err: err.message });
        }
        if (result.length > 0) {
            return res.json({
                message: 'Success',
                data: result[0],
            });
        } else {
            return res.json('False');
        }
    });
});

app.post('/addRoomType', (req, res) => {
    // Lưu các thông tin như tên phòng , mô tả ,...
    const roomSql = 'INSERT INTO `roomtype`(`name`, `des`, `price`, `capicity`) VALUES (?,?,?,?)';
    connect.query(roomSql, [req.body.name, req.body.des, req.body.price, req.body.capicity], (err, result) => {
        if (err) {
            console.error('Lỗi insert room : ', err);
            return res.status(500).send('Internal server error');
        }
        // Lấy id phòng
        const roomId = result.insertId;
        // Lưu ảnh vào cơ sở dữ liệu
        const imgSql = 'INSERT INTO `img`(`path`,`roomId`) VALUES ?';
        const imgName = req.body.filesImg.map(file => [file,roomId])
        connect.query(imgSql,[imgName], (err) => {
            if (err) {
                console.error('Lỗi insert img : ', err);
                return res.status(500).send("Internal server error")
            }
            res.status(201).send('Insert thành công');
        });
    });
});

app.get('/roomType',(req,res)=>{
    const sql = 'SELECT rt.id,rt.name,rt.des,rt.price,rt.capicity, JSON_ARRAYAGG(img.path) AS img_paths FROM roomtype AS rt INNER JOIN img ON rt.id = img.roomId GROUP BY rt.id, rt.name, rt.des, rt.price, rt.capicity';
    connect.query(sql,(err,result)=>{
        if(err){
            return res.json({msg:"Lỗi"})
        }
        return res.json(result);
    })
})
app.listen(port, () => {
    console.log('Server is running on ' + port);
});
