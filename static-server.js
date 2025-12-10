const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const PUBLIC_DIR = '.';

const server = http.createServer((req, res) => {
  // 处理根路径请求
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // 构建完整文件路径
  const fullPath = path.join(__dirname, PUBLIC_DIR, filePath);
  
  // 设置MIME类型
  const extname = path.extname(fullPath);
  const contentType = getContentType(extname);
  
  // 读取文件
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // 文件不存在，返回404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf8');
      } else {
        // 服务器错误
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, 'utf8');
      }
    } else {
      // 文件存在，返回文件内容
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

// 获取MIME类型函数
function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
}

// 启动服务器
server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}/`);
});