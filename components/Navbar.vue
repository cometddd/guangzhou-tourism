<template>
  <header :class="[
        'fixed w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 shadow-md py-3'
      ]" id="navbar">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <a href="index.html" class="flex items-center space-x-2 transition-all duration-300 hover:scale-105" @click.prevent="navigateTo('/')">
        <i :class="['fa fa-map-marker-o text-2xl', scrolled ? 'text-gray-800' : 'text-gray-800 animate-pulse']"></i>
        <span :class="['text-title transition-all duration-300', scrolled ? 'text-lg sm:text-xl' : 'text-lg sm:text-xl animate-fade-in-down']">羊城乐游汇</span>
      </a>
      
      <!-- 桌面导航 -->
      <nav class="hidden md:flex space-x-4 sm:space-x-8">
        <a href="index.html" class="font-medium hover:text-primary transition-all duration-300 py-2 px-3 rounded-md hover:bg-gray-50 hover:translate-y-[-2px]" @click.prevent="navigateTo('/')">首页</a>
        <a href="attractions-guide.html" class="font-medium hover:text-primary transition-all duration-300 py-2 px-3 rounded-md hover:bg-gray-50 hover:translate-y-[-2px]" @click.prevent="navigateTo('/attractions')">景点</a>
        <a href="food.html" class="font-medium hover:text-primary transition-all duration-300 py-2 px-3 rounded-md hover:bg-gray-50 hover:translate-y-[-2px]" @click.prevent="navigateTo('/food')">美食</a>
        <a href="cultural.html" class="font-medium hover:text-primary transition-all duration-300 py-2 px-3 rounded-md hover:bg-gray-50 hover:translate-y-[-2px]" @click.prevent="navigateTo('/cultural')">文化</a>
        <a href="discuss.html" class="font-medium hover:text-primary transition-all duration-300 py-2 px-3 rounded-md hover:bg-gray-50 hover:translate-y-[-2px]" @click.prevent="navigateTo('/discuss')">留言</a>
      </nav>
      
      <!-- 暗黑模式切换按钮 -->
      <button id="darkModeToggle" class="hidden md:block mr-4 text-gray-700 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-50" @click="toggleDarkMode" title="切换暗黑模式">
        <i :class="darkMode ? 'fa fa-moon-o' : 'fa fa-sun-o'"></i>
      </button>
      
      <!-- 登录/用户信息 -->
      <div class="hidden md:flex items-center space-x-4">
        <div v-if="isLoggedIn" class="flex items-center space-x-2">
          <span class="font-medium">{{ userName }}</span>
          <button class="btn-primary" @click="logout">
            <i class="fa fa-sign-out mr-1"></i> 退出登录
          </button>
        </div>
        <div v-else class="flex items-center space-x-2">
          <button id="loginBtn" class="btn-primary transform hover:scale-105" @click="navigateToLogin" title="登录">
            <i class="fa fa-user-circle mr-1"></i> 登录
          </button>
          <button class="btn-secondary transform hover:scale-105" @click="navigateToRegister" title="注册">
            <i class="fa fa-user-plus mr-1"></i> 注册
          </button>
        </div>
      </div>
      
      <!-- 移动端菜单按钮 -->
      <button id="menuBtn" class="md:hidden text-gray-700 hover:text-primary transition-transform duration-300 p-2 rounded-full hover:bg-gray-50" @click="toggleMobileMenu" title="打开菜单">
        <i :class="mobileMenuVisible ? 'fa fa-times' : 'fa fa-bars'" class="text-xl"></i>
      </button>
    </div>
    
    <!-- 移动端导航菜单 -->
    <div v-if="mobileMenuVisible" class="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300" @click="toggleMobileMenu"></div>
    <div id="mobileMenu" :class="{
        'translate-y-0 opacity-100 pointer-events-auto': mobileMenuVisible,
        '-translate-y-full opacity-0 pointer-events-none': !mobileMenuVisible
      }" 
      class="md:hidden bg-white shadow-lg absolute w-full transition-all duration-300 transform origin-top z-50">
        <div class="container mx-auto px-4 py-3 flex flex-col space-y-1">
          <a href="index.html" class="py-4 px-5 border-b border-gray-100 font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300 text-lg" @click.prevent="toggleMobileMenu(); navigateTo('/')" title="首页">首页</a>
          <a href="attractions-guide.html" class="py-4 px-5 border-b border-gray-100 font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300 text-lg" @click.prevent="toggleMobileMenu(); navigateTo('/attractions')" title="景点">景点</a>
          <a href="food.html" class="py-4 px-5 border-b border-gray-100 font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300 text-lg" @click.prevent="toggleMobileMenu(); navigateTo('/food')" title="美食">美食</a>
          <a href="cultural.html" class="py-4 px-5 border-b border-gray-100 font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300 text-lg" @click.prevent="toggleMobileMenu(); navigateTo('/cultural')" title="文化">文化</a>
          <a href="discuss.html" class="py-4 px-5 border-b border-gray-100 font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300 text-lg" @click.prevent="toggleMobileMenu(); navigateTo('/discuss')" title="留言">留言</a>
          <!-- 移动端登录/用户信息 -->
          <div v-if="isLoggedIn" class="flex flex-col space-y-2 mt-4">
            <div class="py-2 text-center font-medium">{{ userName }}</div>
            <button class="block w-full btn-primary text-center py-3 text-lg" @click="logout" title="退出登录">
              <i class="fa fa-sign-out mr-2"></i> 退出登录
            </button>
          </div>
          <div v-else class="flex flex-col space-y-2 mt-4">
            <button id="mobileLoginBtn" class="block w-full btn-primary text-center py-3 text-lg" @click="navigateToLogin" title="登录">
              <i class="fa fa-user-circle mr-2"></i> 登录
            </button>
            <button class="block w-full btn-secondary text-center py-3 text-lg" @click="navigateToRegister" title="注册">
              <i class="fa fa-user-plus mr-2"></i> 注册
            </button>
          </div>
          <!-- 移动端暗黑模式切换 -->
          <button id="mobileDarkModeToggle" class="flex items-center justify-center py-4 px-5 font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300 text-lg" @click="toggleDarkMode" title="切换主题">
            <i :class="darkMode ? 'fa fa-moon-o' : 'fa fa-sun-o'" class="mr-3"></i>
            {{ darkMode ? '浅色模式' : '深色模式' }}
          </button>
        </div>
      </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      mobileMenuVisible: false,
      darkMode: localStorage.getItem('darkMode') === 'true' || false,
      scrolled: false,
      isLoggedIn: false,
      userName: ''
    };
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener('scroll', this.handleScroll);
    // 应用保存的暗黑模式状态
    this.updateDarkModeUI();
    // 检查登录状态
    this.checkLoginStatus();
  },
  beforeDestroy() {
    // 移除滚动事件监听
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // 处理滚动事件
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
    navigateTo(path) {
      // 检查是否有路由实例
      if (window.navigateTo) {
        window.navigateTo(this.$router, path);
      } else {
        // 如果没有路由实例，直接跳转
        const pathMap = {
          '/': 'index.html',
          '/attractions': 'attractions-guide.html',
          '/food': 'food.html',
          '/cultural': 'cultural.html',
          '/discuss': 'discuss.html'
        };
        window.location.href = pathMap[path] || 'index.html';
      }
    },
    navigateToLogin() {
      // 检查是否已登录
      if (this.isLoggedIn) {
        alert('您已登录');
        return;
      }
      window.location.href = 'login.html';
    },
    navigateToRegister() {
      // 检查是否已登录
      if (this.isLoggedIn) {
        alert('您已登录');
        return;
      }
      window.location.href = 'register.html';
    },
    logout() {
      // 调用store的登出方法
      if (window.store) {
        window.store.dispatch('logout');
      }
      // 清除localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      // 更新状态
      this.isLoggedIn = false;
      this.userName = '';
      // 刷新页面
      window.location.reload();
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
      this.updateDarkModeUI();
    },
    updateDarkModeUI() {
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    checkLoginStatus() {
      // 从localStorage检查登录状态
      const savedUser = localStorage.getItem('user');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (isLoggedIn) {
        this.isLoggedIn = true;
        try {
          if (savedUser) {
            const userData = JSON.parse(savedUser);
            this.userName = userData.name || userData.email.split('@')[0];
          } else {
            // 如果没有保存用户名，使用默认名称
            this.userName = '用户';
          }
        } catch (error) {
          console.error('Failed to parse user data:', error);
          this.userName = '用户';
        }
      } else {
        this.isLoggedIn = false;
        this.userName = '';
      }
    }
  }
}
</script>