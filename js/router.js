// 定义路由组件
const Home = {
  template: '<div>首页内容</div>'
};

const Attractions = {
  template: '<div>景点指南</div>'
};

const Food = {
  template: '<div>美食推荐</div>'
};

const Cultural = {
  template: '<div>文化特色</div>'
};

const Discuss = {
  template: '<div>讨论区</div>'
};

const Login = {
  template: '<div>登录页面</div>'
};

// 创建路由实例
function createRouter() {
  return new VueRouter({
    mode: 'hash', // 使用hash模式，适合多页面应用
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/attractions',
        name: 'attractions',
        component: Attractions
      },
      {
        path: '/food',
        name: 'food',
        component: Food
      },
      {
        path: '/cultural',
        name: 'cultural',
        component: Cultural
      },
      {
        path: '/discuss',
        name: 'discuss',
        component: Discuss
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      }
    ]
  });
}

// 路由导航辅助函数
function navigateTo(router, path) {
  // 先检查是否已经在目标页面
  const currentPath = window.location.pathname;
  const targetPage = path.replace('/', '') + '.html';
  
  if (currentPath.endsWith(targetPage)) {
    // 如果已经在目标页面，只更新路由状态
    router.push(path);
  } else {
    // 否则，跳转到目标页面
    window.location.href = targetPage;
  }
}

// 页面加载时初始化路由
function initRouter(vueInstance) {
  const router = createRouter();
  vueInstance.$router = router;
  
  // 初始化路由状态
  const currentPath = window.location.pathname;
  let initialRoute = '/';
  
  if (currentPath.endsWith('attractions-guide.html')) {
    initialRoute = '/attractions';
  } else if (currentPath.endsWith('food.html')) {
    initialRoute = '/food';
  } else if (currentPath.endsWith('cultural.html')) {
    initialRoute = '/cultural';
  } else if (currentPath.endsWith('discuss.html')) {
    initialRoute = '/discuss';
  } else if (currentPath.endsWith('login.html')) {
    initialRoute = '/login';
  }
  
  router.push(initialRoute);
  
  return router;
}