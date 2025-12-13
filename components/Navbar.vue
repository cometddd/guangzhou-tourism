<template>
  <header id="navbar" class="fixed w-full z-50 transition-all duration-300 bg-white/90 shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <a href="index.html" class="flex items-center space-x-2">
        <i class="fa fa-map-marker text-primary text-2xl"></i>
        <span class="text-title text-xl">羊城乐游汇</span>
      </a>
      
      <!-- 桌面导航 -->
      <nav class="hidden md:flex space-x-8">
        <a href="index.html" class="font-medium hover:text-primary transition-colors">首页</a>
        <a href="attractions-guide.html" class="font-medium hover:text-primary transition-colors">景点</a>
        <a href="food.html" class="font-medium hover:text-primary transition-colors">美食</a>
        <a href="cultural.html" class="font-medium hover:text-primary transition-colors">文化</a>
        <a href="discuss.html" class="font-medium hover:text-primary transition-colors">留言</a>
      </nav>
      
      <!-- 暗黑模式切换按钮 -->
      <button id="darkModeToggle" class="hidden md:block mr-4 text-gray-700 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-50" @click="toggleDarkMode" title="切换暗黑模式">
        <i :class="darkMode ? 'fa fa-sun-o' : 'fa fa-moon-o'"></i>
      </button>
      
      <!-- 登录按钮 -->
      <button id="loginBtn" class="hidden md:block btn-primary" @click="navigateToLogin">
        <i class="fa fa-user-circle mr-1"></i> 登录
      </button>
      
      <!-- 移动端菜单按钮 -->
      <button id="menuBtn" class="md:hidden text-gray-700 hover:text-primary" @click="toggleMobileMenu">
        <i class="fa fa-bars text-xl"></i>
      </button>
    </div>
    
    <!-- 移动端导航菜单 -->
    <div id="mobileMenu" :class="{'hidden': !mobileMenuVisible}" class="hidden md:hidden bg-white shadow-lg absolute w-full">
      <div class="container mx-auto px-4 py-3 flex flex-col space-y-3">
        <a href="index.html" class="py-2 border-b border-gray-100 font-medium hover:text-primary transition-colors">首页</a>
        <a href="attractions-guide.html" class="py-2 border-b border-gray-100 font-medium hover:text-primary transition-colors">景点</a>
        <a href="food.html" class="py-2 border-b border-gray-100 font-medium hover:text-primary transition-colors">美食</a>
        <a href="cultural.html" class="py-2 border-b border-gray-100 font-medium hover:text-primary transition-colors">文化</a>
        <a href="discuss.html" class="py-2 font-medium hover:text-primary transition-colors">留言</a>
        <a href="login.html" class="btn-primary mt-2 py-2 text-center" @click="navigateToLogin">
          <i class="fa fa-user-circle mr-1"></i> 登录
        </a>
        <!-- 移动端暗黑模式切换 -->
        <button id="mobileDarkModeToggle" class="flex items-center justify-center py-2 font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-300" @click="toggleDarkMode" title="切换主题">
          <i :class="darkMode ? 'fa fa-sun-o' : 'fa fa-moon-o'" class="mr-3"></i>
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
      darkMode: localStorage.getItem('darkMode') === 'true' || false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
    navigateToLogin() {
      window.location.href = 'login.html';
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
    }
  },
  mounted() {
    // 应用保存的暗黑模式状态
    this.updateDarkModeUI();
    
    // 导航栏滚动效果
    window.addEventListener('scroll', () => {
      const navbar = this.$el;
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}
</script>