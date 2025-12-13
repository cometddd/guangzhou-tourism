const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// 读取用户数据
function readUsersData() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../assets/data/users.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取用户数据失败:', error);
    return [];
  }
}

// 写入用户数据
function writeUsersData(users) {
  try {
    fs.writeFileSync(path.join(__dirname, '../assets/data/users.json'), JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('写入用户数据失败:', error);
    return false;
  }
}

// 读取留言数据
function readFeedbacksData() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../assets/data/feedbacks.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取留言数据失败:', error);
    return [];
  }
}

// 写入留言数据
function writeFeedbacksData(feedbacks) {
  try {
    fs.writeFileSync(path.join(__dirname, '../assets/data/feedbacks.json'), JSON.stringify(feedbacks, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('写入留言数据失败:', error);
    return false;
  }
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 设置CORS头，允许跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS请求（预检请求）
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 处理注册请求
  if (req.url === '/api/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { name, email, password } = JSON.parse(body);

        // 验证必填字段
        if (!name || !email || !password) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '请填写完整信息' }));
          return;
        }

        // 读取现有用户数据
        const users = readUsersData();

        // 检查邮箱是否已存在
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '该邮箱已被注册' }));
          return;
        }

        // 创建新用户
        const newUser = {
          id: Date.now(), // 使用时间戳作为简单的唯一ID
          name,
          email,
          password, // 实际项目中应该加密存储
          createdAt: new Date().toISOString()
        };

        // 保存新用户
        users.push(newUser);
        if (!writeUsersData(users)) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '服务器错误，请稍后重试' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: '注册成功' }));
      } catch (error) {
        console.error('处理注册请求失败:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: '请求格式错误' }));
      }
    });
    return;
  }

  // 处理登录请求
  if (req.url === '/api/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);

        // 验证必填字段
        if (!email || !password) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '请填写邮箱和密码' }));
          return;
        }

        // 读取用户数据
        const users = readUsersData();

        // 查找用户
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: '登录成功',
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '邮箱或密码错误' }));
        }
      } catch (error) {
        console.error('处理登录请求失败:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: '请求格式错误' }));
      }
    });
    return;
  }

  // 处理获取用户列表请求
  if (req.url === '/api/users' && req.method === 'GET') {
    const users = readUsersData();
    // 移除密码字段
    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(usersWithoutPassword));
    return;
  }

  // 处理获取留言列表请求
  if (req.url === '/api/feedbacks' && req.method === 'GET') {
    const feedbacks = readFeedbacksData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, feedbacks }));
    return;
  }

  // 处理提交留言请求
  if (req.url === '/api/feedbacks' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const feedbackData = JSON.parse(body);

        // 验证必填字段
        if (!feedbackData.name || !feedbackData.content || feedbackData.rating === undefined) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '请填写完整信息' }));
          return;
        }

        // 读取现有留言数据
        const feedbacks = readFeedbacksData();

        // 创建新留言
        const newFeedback = {
          ...feedbackData,
          id: Date.now(), // 使用时间戳作为简单的唯一ID
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
          likes: 0,
          replies: 0
        };

        // 保存新留言
        feedbacks.unshift(newFeedback);
        if (!writeFeedbacksData(feedbacks)) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '服务器错误，请稍后重试' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, feedback: newFeedback }));
      } catch (error) {
        console.error('处理留言请求失败:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: '请求格式错误' }));
      }
    });
    return;
  }

  // 默认返回404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});