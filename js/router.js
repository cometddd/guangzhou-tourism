// 创建路由实例（简化版，适合多页面应用）
function createRouter() {
  return new VueRouter({
    mode: 'hash', // 使用hash模式，适合多页面应用
    routes: [
      {
        path: '/',
        name: 'home'
      },
      {
        path: '/attractions',
        name: 'attractions'
      },
      {
        path: '/food',
        name: 'food'
      },
      {
        path: '/cultural',
        name: 'cultural'
      },
      {
        path: '/discuss',
        name: 'discuss'
      },
      {
        path: '/login',
        name: 'login'
      },
      {
        path: '/guangzhouta-detail',
        name: 'guangzhouta-detail'
      },
      {
        path: '/chenjiaci-detail',
        name: 'chenjiaci-detail'
      },
      {
        path: '/shamiandao-detail',
        name: 'shamiandao-detail'
      },
      {
        path: '/changfen-detail',
        name: 'changfen-detail'
      },
      {
        path: '/shaoe-detail',
        name: 'shaoe-detail'
      },
      {
        path: '/xiaojiao-detail',
        name: 'xiaojiao-detail'
      },
      {
        path: '/yueju-detail',
        name: 'yueju-detail'
      },
      {
        path: '/yuecai-detail',
        name: 'yuecai-detail'
      },
      {
        path: '/yueyu-detail',
        name: 'yueyu-detail'
      }
    ]
  });
}

// 路由导航辅助函数
function navigateTo(router, path) {
  // 先检查是否已经在目标页面
  const currentPath = window.location.pathname;
  let targetPage;
  
  // 特殊处理首页和景点页面
  if (path === '/') {
    targetPage = 'index.html';
  } else if (path === '/attractions') {
    targetPage = 'attractions-guide.html';
  } else {
    targetPage = path.replace('/', '') + '.html';
  }
  
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
  } else if (currentPath.endsWith('guangzhouta-detail.html')) {
    initialRoute = '/guangzhouta-detail';
  } else if (currentPath.endsWith('chenjiaci-detail.html')) {
    initialRoute = '/chenjiaci-detail';
  } else if (currentPath.endsWith('shamiandao-detail.html')) {
    initialRoute = '/shamiandao-detail';
  } else if (currentPath.endsWith('changfen-detail.html')) {
    initialRoute = '/changfen-detail';
  } else if (currentPath.endsWith('shaoe-detail.html')) {
    initialRoute = '/shaoe-detail';
  } else if (currentPath.endsWith('xiaojiao-detail.html')) {
    initialRoute = '/xiaojiao-detail';
  } else if (currentPath.endsWith('yueju-detail.html')) {
    initialRoute = '/yueju-detail';
  } else if (currentPath.endsWith('yuecai-detail.html')) {
    initialRoute = '/yuecai-detail';
  } else if (currentPath.endsWith('yueyu-detail.html')) {
    initialRoute = '/yueyu-detail';
  }
  
  router.push(initialRoute);
  
  return router;
}