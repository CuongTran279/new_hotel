const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connect = require('./connect');
const { log } = require('console');

const port = process.env.DB_PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Cấu hình lưu trữ và tên file cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, '../frontend/src/image');
    },
    filename: function (req, file, cb) {
        const filename =  Date.now()+'.jpg';
        const filepath = path.join('../frontend/src/image/', filename);

        // Kiểm tra nếu tệp đã tồn tại
        fs.access(filepath, fs.constants.F_OK, (err) => {
            if (err) {
                // Tệp không tồn tại, tiếp tục lưu trữ tệp
                cb(null, filename);
            } else {
                // Tệp tồn tại, bỏ qua tệp này (trả về null để không lưu tệp)
                cb(null, false);
            }
        });
    },
});

const upload = multer({ storage: storage });

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

app.post('/addRoomType', upload.array('images', 4), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Không có file nào được upload');
    }
    const roomSql = 'INSERT INTO roomtype(name, des, price, capicity) VALUES (?,?,?,?)';
    connect.query(roomSql, [req.body.name, req.body.des, req.body.price, req.body.capicity], (err, result) => {
        if (err) {
            console.error('Lỗi insert room : ', err);
            return res.status(500).send('Internal server error');
        }
        const roomId = result.insertId;
        const imgSql = 'INSERT INTO `img`(`path`,`roomId`) VALUES ?';
        const filePaths = req.files.map((file) => [file.filename, roomId]);
        connect.query(imgSql, [filePaths], (err) => {
            if (err) {
                console.error('Lỗi insert img : ', err);
                return res.status(500).send('Internal server error');
            }
            res.status(201).send('Insert thành công');
        });
    });
});

app.get('/roomType', (req, res) => {
    const sql =
        'SELECT rt.id,rt.name,rt.des,rt.price,rt.capicity, JSON_ARRAYAGG(img.path) AS img_paths FROM roomtype AS rt INNER JOIN img ON rt.id = img.roomId GROUP BY rt.id, rt.name, rt.des, rt.price, rt.capicity';
    connect.query(sql, (err, result) => {
        if (err) {
            return res.json({ msg: 'Lỗi' });
        }
        return res.json(result);
    });
});
app.post('/updateRoomType/:id', upload.array('images', 4), (req, res) => {
    const roomId = req.params.id;

    // Kiểm tra nếu không có tệp nào được tải lên
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Không có file nào được upload');
    }

    // Cập nhật thông tin loại phòng
    const updateRoomSql = 'UPDATE roomtype SET name = ?, des = ?, price = ?, capicity = ? WHERE id = ?';
    connect.query(updateRoomSql, [req.body.name, req.body.des, req.body.price, req.body.capicity, roomId], (err) => {
        if (err) {
            console.error('Lỗi cập nhật loại phòng: ', err);
            return res.status(500).send('Internal server error');
        }

        // Xóa các hình ảnh cũ liên quan đến loại phòng này
        const deleteImgSql = 'DELETE FROM img WHERE roomId = ?';
        connect.query(deleteImgSql, [roomId], (err) => {
            if (err) {
                console.error('Lỗi xóa hình ảnh cũ: ', err);
                return res.status(500).send('Internal server error');
            }

            // Chèn các hình ảnh mới
            const insertImgSql = 'INSERT INTO img(path, roomId) VALUES ?';
            const filePaths = req.files.map((file) => [file.filename, roomId]);
            connect.query(insertImgSql, [filePaths], (err) => {
                if (err) {
                    console.error('Lỗi chèn hình ảnh mới: ', err);
                    return res.status(500).send('Internal server error');
                }
                res.status(200).send('Cập nhật thành công');
            });
        });
    });
});

app.get('/getRoomType/:id', (req, res) => {
    const sql =
        'SELECT roomType.id, roomType.name, roomType.des, roomType.price, roomType.capicity, GROUP_CONCAT(img.path) as img FROM roomType INNER JOIN img ON roomType.id = img.roomId WHERE roomType.id = ? GROUP BY roomType.id, roomType.name, roomType.des, roomType.price, roomType.capicity ';
    const id = req.params.id;
    connect.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length > 0) {
            const room = result[0];
            room.img = room.img ? room.img.split(',') : [];
            res.json(room);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    });
}); 

app.delete('/deleteRoomType/:id', (req, res) => {
    const id = req.params.id;

    connect.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: 'Transaction error' });
        }

        const sqlImg = 'DELETE FROM img WHERE roomId = ?';
        connect.query(sqlImg, [id], (err, result) => {
            if (err) {
                return connect.rollback(() => {
                    res.status(500).json({ error: 'Không xóa được ảnh' });
                });
            }

            const sql = 'DELETE FROM roomType WHERE id = ?';
            connect.query(sql, [id], (err, result) => {
                if (err) {
                    return connect.rollback(() => {
                        res.status(500).json({ error: 'Không xóa được roomType' });
                    });
                }

                connect.commit((err) => {
                    if (err) {
                        return connect.rollback(() => {
                            res.status(500).json({ error: 'Commit error' });
                        });
                    }

                    res.json({ message: 'Room and images deleted successfully' });
                });
            });
        });
    });
});

app.post('/addHotel', (req, res) => {
    const roomSql = 'INSERT INTO hotel(name, address, phone) VALUES (?,?,?)';
    connect.query(roomSql, [req.body.name, req.body.address, req.body.phone], (err, result) => {
        if (err) {
            console.error('Lỗi insert hotel : ', err);
            return res.status(500).send('Internal server error');
        }
        const hotelId = result.insertId;
        const room = req.body.options.split(',').map((room)=>[hotelId,room])
        const roomSql = 'INSERT INTO room(hotelId, roomId) VALUES ?';
        connect.query(roomSql, [room], (err) => {
            if (err) {
                console.error('Lỗi insert room : ', err);
                return res.status(500).send('Internal server error');
            }
            res.status(201).send('Insert thành công');
        });
    });
});

app.listen(port, () => {
    console.log('Server is running on ' + port);
});
