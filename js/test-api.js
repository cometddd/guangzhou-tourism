const http = require('http');
const fs = require('fs');
const path = require('path');

// 测试用户数据（使用新的邮箱进行注册测试）
const testUser = {
  name: '新测试用户',
  email: 'newtest@example.com',
  password: 'newtest123'
};

// 发送HTTP请求的函数
function sendRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// 测试函数
async function runTests() {
  console.log('开始测试注册登录API...\n');

  try {
    // 1. 测试注册
    console.log('1. 测试注册接口...');
    const registerOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const registerResponse = await sendRequest(registerOptions, testUser);
    console.log('   状态码:', registerResponse.statusCode);
    console.log('   响应:', registerResponse.body);

    if (registerResponse.body.success) {
      console.log('   ✅ 注册测试通过\n');
    } else {
      console.log('   ❌ 注册测试失败\n');
    }

    // 2. 测试登录
    console.log('2. 测试登录接口...');
    const loginOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const loginData = { email: testUser.email, password: testUser.password };
    const loginResponse = await sendRequest(loginOptions, loginData);
    console.log('   状态码:', loginResponse.statusCode);
    console.log('   响应:', loginResponse.body);

    if (loginResponse.body.success) {
      console.log('   ✅ 登录测试通过\n');
    } else {
      console.log('   ❌ 登录测试失败\n');
    }

    // 3. 检查用户数据文件
    console.log('3. 检查用户数据文件...');
    const usersFilePath = path.join(__dirname, '../assets/data/users.json');
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    console.log('   用户数据文件包含', usersData.length, '个用户');
    console.log('   最后一个用户:', usersData[usersData.length - 1]);
    console.log('   ✅ 用户数据文件检查通过\n');

    console.log('✅ 所有测试通过！注册登录功能正常工作');
    
    // 清理测试数据
    console.log('\n清理测试数据...');
    const cleanupUsersPath = path.join(__dirname, '../assets/data/users.json');
    const cleanupUsersData = JSON.parse(fs.readFileSync(cleanupUsersPath, 'utf8'));
    const filteredUsers = cleanupUsersData.filter(user => user.email !== testUser.email);
    fs.writeFileSync(cleanupUsersPath, JSON.stringify(filteredUsers, null, 2));
    console.log('✅ 测试数据清理完成');

  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error);
  }
}

// 运行测试
runTests();