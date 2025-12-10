<template>
  <header id="navbar" class="fixed w-full z-50 transition-all duration-300 bg-white/90 shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <a href="#" class="flex items-center space-x-2">
        <i class="fa fa-map-marker text-primary text-2xl"></i>
        <span class="text-title text-xl">广州</span>
      </a>
      
      <!-- 桌面导航 -->
      <nav class="hidden md:flex space-x-8">
        <a href="#home" class="font-medium hover:text-primary transition-colors">首页</a>
        <a href="#attractions" class="font-medium hover:text-primary transition-colors">景点</a>
        <a href="#food" class="font-medium hover:text-primary transition-colors">美食</a>
        <a href="#culture" class="font-medium hover:text-primary transition-colors">文化</a>
        <a href="discuss.html" class="font-medium hover:text-primary transition-colors">留言</a>
      </nav>
      
      <!-- 登录按钮 -->
      <button id="loginBtn" class="hidden md:block btn-primary" onclick="window.location.href='login.html'">
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
        <a href="#home" class="py-2 border-b border-gray-100 font-medium hover:text-primary transition-colors">首页</a>
        <a href="#attractions" class="py-2 border-b border-gray-100 font-medium hover:text-primary transition-colors">景点</a>
        <a href="#food" class="py-2 border-b border-gray-100 font-medium hover:text-primary transition-colors">美食</a>
        <a href="#culture" class="py-2 border-b border-gray-100 font-medium hover:text-primary transition-colors">文化</a>
        <a href="discuss.html" class="py-2 font-medium hover:text-primary transition-colors">留言</a>
        <button id="loginBtn" class="hidden md:block btn-primary" onclick="window.location.href='login.html'">
          <i class="fa fa-user-circle mr-1"></i> 登录
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
      mobileMenuVisible: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    }
  }
}
</script>