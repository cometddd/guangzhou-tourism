# 羊城乐游汇 - 广州旅游指引网站

## 项目概述

"羊城乐游汇"是一个专为广州旅游设计的综合性网站，提供景点介绍、美食推荐、文化体验等信息，帮助游客更好地了解和探索广州这座城市。

## 技术栈

- **前端框架**: Vue.js 2.x
- **状态管理**: Vuex
- **样式框架**: Tailwind CSS 3.x
- **UI组件**: Font Awesome 5.x
- **构建工具**: 无（原生HTML/CSS/JavaScript）

## 项目结构

```
├── assets/             # 静态资源
│   ├── images/         # 图片资源
│   └── styles/         # 样式文件
├── js/                 # JavaScript文件
│   ├── store.js        # Vuex状态管理
│   └── main.js         # 主入口文件
├── data/               # 数据文件
│   ├── attractions.json # 景点数据
│   ├── foods.json      # 美食数据
│   └── feedbacks.json  # 留言数据
├── index.html          # 首页
├── attractions-guide.html # 景点指南
├── food.html           # 美食推荐
├── contact.html        # 联系我们
├── style.css           # 主样式文件
└── README.md           # 项目说明文档
```

## 功能特性

- **景点浏览**: 提供广州主要景点的详细介绍，包括图片、地址、开放时间等信息
- **美食推荐**: 推荐广州特色美食，包括早茶点心、烧腊卤味、特色小吃等
- **文化体验**: 介绍广州的历史文化和特色活动
- **收藏功能**: 支持用户收藏喜欢的景点和美食，使用localStorage存储
- **搜索筛选**: 支持按分类筛选景点和美食
- **响应式设计**: 适配不同屏幕尺寸的设备

## 部署说明

### 本地部署

1. **克隆或下载项目**
   ```bash
   git clone <项目仓库地址>
   # 或直接下载项目压缩包并解压
   ```

2. **启动本地服务器**
   
   由于项目使用了前端路由和AJAX请求，需要通过HTTP服务器访问，不能直接打开HTML文件。
   
   **方法1: 使用Python内置服务器**
   ```bash
   # Python 3.x
   python -m http.server 8000
   
   # Python 2.x
   python -m SimpleHTTPServer 8000
   ```
   
   **方法2: 使用Node.js的http-server**
   ```bash
   # 全局安装http-server
   npm install -g http-server
   
   # 启动服务器
   http-server -p 8000
   ```
   
   **方法3: 使用PHP内置服务器**
   ```bash
   php -S localhost:8000
   ```

3. **访问网站**
   在浏览器中输入 `http://localhost:8000` 即可访问网站。

### 生产环境部署

1. **准备生产环境**
   - 确保服务器已安装Web服务器软件（如Apache、Nginx）
   - 确保服务器支持静态文件访问

2. **上传文件**
   使用FTP、SFTP等工具将项目文件上传到服务器的网站根目录。

3. **配置服务器**
   - 确保服务器配置正确，支持HTML5 History模式（如果使用了前端路由）
   - 确保静态资源的MIME类型配置正确

4. **访问网站**
   通过配置的域名或IP地址访问网站。

## 开发说明

### 数据修改

- 景点数据：`data/attractions.json`
- 美食数据：`data/foods.json`
- 留言数据：`data/feedbacks.json`

### 样式修改

- 主样式文件：`style.css`
- Tailwind CSS配置：在HTML文件的`<head>`标签中通过CDN引入

### 功能扩展

1. **添加新页面**
   - 创建新的HTML文件
   - 在Vue实例中添加相应的组件和方法

2. **添加新功能**
   - 在`js/store.js`中添加新的状态和方法
   - 在Vue组件中使用Vuex的mapState、mapGetters等辅助函数

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- IE 11 (部分功能可能不支持)

## 许可证

MIT License
