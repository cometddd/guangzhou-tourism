const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// 创建MySQL连接池
const pool = mysql.createPool({
    host: 'localhost',
    post:3306,
    user: 'root', // 修改为你的数据库用户名
    password: '123456', // 修改为你的数据库密码
    database: 'tourism', // 修改为你的数据库名
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(bodyParser.json());
app.use(express.static('public')); // 静态文件目录

// 注册接口
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // 检查邮箱是否已被注册
    const checkSql = 'SELECT * FROM users WHERE email = ?';
    pool.query(checkSql, [email], (err, results) => {
        if (err) {
            console.error('数据库查询错误:', err);
            return res.status(500).json({ success: false, message: '服务器内部错误' });
        }
        
        if (results.length > 0) {
            return res.json({ success: false, message: '该邮箱已被注册，请使用其他邮箱' });
        }
        
        // 插入新用户
        const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        pool.query(insertSql, [name, email, password], (err, results) => {
            if (err) {
                console.error('数据库插入错误:', err);
                return res.status(500).json({ success: false, message: '注册失败，请重试' });
            }
            
            res.json({ success: true, message: '注册成功' });
        });
    });
});

// 登录接口
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // 查询用户
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    pool.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('数据库查询错误:', err);
            return res.status(500).json({ success: false, message: '服务器内部错误' });
        }
        
        if (results.length === 0) {
            return res.json({ success: false, message: '邮箱或密码错误' });
        }
        
        const user = results[0];
        res.json({ 
            success: true, 
            message: '登录成功', 
            user: { id: user.id, name: user.name, email: user.email } 
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});