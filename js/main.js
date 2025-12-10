// 定义全局数据
const data = {
  // 导航栏状态
  mobileMenuVisible: false,
  loginModalVisible: false,
  modalReady: false,
  currentUser: null, // 当前登录用户
  
  // 轮播图数据（currentIndex仍在data中，carouselImages从store获取）
  currentIndex: 0,
  carouselInterval: null, // 自动轮播定时器
  
  // 留言表单数据
  feedback: {
    name: '',
    email: '',
    subject: '',
    content: '',
    rating: 0,
    errors: {
      name: '',
      email: ''
    },
    isSubmitting: false,
    submitSuccess: false
  },
  
  // 登录表单数据
  login: {
    email: '',
    password: '',
    captcha: '',
    remember: false,
    errors: {
      email: '',
      password: '',
      captcha: ''
    },
    message: '',
    isSuccess: false,
    isLoading: false
  },
  
  // 注册表单数据
  register: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    errors: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: ''
    },
    message: '',
    isSuccess: false,
    isLoading: false
  },
  
  // 密码可见性
  passwordVisible: false,
  confirmPasswordVisible: false
};

// 注册Carousel组件
Vue.component('carousel', {
  template: `
    <div class="relative w-full h-full overflow-hidden">
      <!-- 轮播图图片 -->
      <div class="absolute inset-0 z-0">
        <div v-for="(item, index) in images" :key="index" 
             class="carousel-item absolute inset-0 transition-opacity duration-1000 ease-in-out" 
             v-if="currentIndex === index">
          <img :src="item.src" :alt="item.alt" class="w-full h-full object-cover">
        </div>
        <!-- 调整遮罩层透明度以确保文字清晰可见 -->
        <div class="absolute inset-0 bg-black/30"></div>
      </div>
      
      <!-- 轮播控制按钮 -->
      <button class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 btn-transparent" @click="prevSlide">
        <i class="fa fa-chevron-left text-2xl"></i>
      </button>
      <button class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 btn-transparent" @click="nextSlide">
        <i class="fa fa-chevron-right text-2xl"></i>
      </button>
      
      <!-- 轮播指示器 -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        <button v-for="(item, index) in images" :key="index" 
                class="w-3 h-3 rounded-full transition-all duration-300" 
                :class="{ 'bg-white w-6': currentIndex === index, 'bg-white/50': currentIndex !== index }" 
                @click="goToSlide(index)"></button>
      </div>
    </div>
  `,
  props: {
    images: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.resetTimer();
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.resetTimer();
    },
    goToSlide(index) {
      this.currentIndex = index;
      this.resetTimer();
    },
    resetTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.nextSlide();
      }, this.interval);
    }
  },
  mounted() {
    this.resetTimer();
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
});
  
  // 注册Footer组件
  Vue.component('footer-component', {
  template: `
    <footer class="bg-secondary text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">广州特色</h3>
            <p class="text-white/80 mb-4">探索千年商都的魅力，品味岭南文化的精髓。</p>
            <div class="flex space-x-4">
              <a href="#" class="text-white/80 hover:text-white transition-colors" title="微博">
                <i class="fa fa-weibo text-xl"></i>
              </a>
              <a href="#" class="text-white/80 hover:text-white transition-colors" title="微信">
                <i class="fa fa-wechat text-xl"></i>
              </a>
              <a href="#" class="text-white/80 hover:text-white transition-colors" title="Instagram">
                <i class="fa fa-instagram text-xl"></i>
              </a>
              <a href="#" class="text-white/80 hover:text-white transition-colors" title="YouTube">
                <i class="fa fa-youtube-play text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">快速链接</h3>
            <ul class="space-y-2">
              <li><a href="index.html#home" class="text-white/80 hover:text-white transition-colors">首页</a></li>
              <li><a href="index.html#attractions" class="text-white/80 hover:text-white transition-colors">景点</a></li>
              <li><a href="food.html" class="text-white/80 hover:text-white transition-colors">美食</a></li>
              <li><a href="index.html#culture" class="text-white/80 hover:text-white transition-colors">文化</a></li>
              <li><a href="index.html#feedback" class="text-white/80 hover:text-white transition-colors">留言</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">联系我们</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <i class="fa fa-map-marker mr-2"></i>
                <span class="text-white/80">广州市天河区天河路520号</span>
              </li>
              <li class="flex items-center">
                <i class="fa fa-phone mr-2"></i>
                <span class="text-white/80">+86 20 12345678</span>
              </li>
              <li class="flex items-center">
                <i class="fa fa-envelope mr-2"></i>
                <span class="text-white/80">info@guangzhoutourism.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">订阅更新</h3>
            <p class="text-white/80 mb-4">订阅我们的新闻通讯，获取最新的旅游信息和优惠。</p>
            <form class="flex">
              <input 
                type="email" 
                placeholder="你的邮箱地址" 
                class="px-4 py-2 rounded-l-md w-full focus:outline-none">
              <button type="submit" class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-md transition-colors">
                订阅
              </button>
            </form>
          </div>
        </div>
        
        <div class="border-t border-white/20 mt-12 pt-8 text-center text-white/60 text-sm">
          <p>© 2025 广州特色展示. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  `
});

// Navbar组件
Vue.component('navbar', {
  template: `
    <header :class="[
          'fixed w-full z-50 transition-all duration-300',
          scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 shadow-md py-3'
        ]" id="navbar">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <a href="index.html" class="flex items-center space-x-2 transition-all duration-300 hover:scale-105" @click.prevent="navigateTo('/')">
          <i :class="['fa fa-map-marker-o text-2xl', scrolled ? 'text-gray-800' : 'text-gray-800']"></i>
          <span :class="['text-title transition-all duration-300', scrolled ? 'text-lg sm:text-xl' : 'text-lg sm:text-xl']">羊城乐游汇</span>
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
  `,
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
});

// 在DOM加载完成后创建Vue实例
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, creating Vue instance...');
  
  // 创建Vue实例
  const app = new Vue({
    // 将实例暴露到全局window对象
    beforeMount() {
      window.app = this;
    },
    el: '#app',
    data: data,
    store: store, // 引入Vuex Store
    computed: {
      carouselImages() {
        return this.$store.getters.carouselImages;
      }
    },
    mounted() {
      console.log('Vue instance mounted, initializing carousel...');
      
      // 从localStorage恢复登录状态和用户信息
      this.restoreLoginState();
      
    // 初始化自动轮播
    this.startAutoSlide();
    console.log('Carousel initialized, carouselImages:', this.carouselImages);
  },
  beforeDestroy() {
    // 组件销毁时清除定时器，避免内存泄漏
    console.log('beforeDestroy called, clearing interval:', this.carouselInterval);
    if (this.carouselInterval) {
      // 无论使用setInterval还是setTimeout，都使用clearTimeout清除
      clearTimeout(this.carouselInterval);
    }
  },
  methods: {
    /**
     * 从localStorage恢复登录状态和用户信息
     */
    restoreLoginState() {
      // 检查登录状态
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        // 获取用户信息
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const user = JSON.parse(userData);
            // 设置当前用户信息
            this.currentUser = {
              name: user.name,
              avatar: `assets/images/users/user${Math.floor(Math.random() * 10) + 1}.jpg`
            };
          } catch (error) {
            console.error('解析用户信息失败:', error);
            // 清除无效的用户信息
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
          }
        } else {
          // 用户信息不存在，但登录状态存在，可能是数据不一致
          localStorage.removeItem('isLoggedIn');
        }
      }
    },
    
    /**
     * 切换移动端菜单显示状态
     */
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
    
    /**
     * 轮播图切换到下一张
     */
    nextSlide() {
      console.log('nextSlide called, currentIndex:', this.currentIndex, 'carouselImages length:', this.carouselImages.length);
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
      console.log('nextSlide completed, new currentIndex:', this.currentIndex);
    },
    
    /**
     * 轮播图切换到上一张
     */
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    },
    
    /**
     * 处理轮播指示器点击事件
     * @param {number} index - 点击的指示器索引
     */
    goToSlide(index) {
      console.log('goToSlide called with index:', index);
      this.currentIndex = index;
      console.log('goToSlide completed, new currentIndex:', this.currentIndex);
      // 点击后重新启动自动轮播
      this.startAutoSlide();
    },
    
    /**
     * 开始自动轮播
     */
    startAutoSlide() {
      console.log('startAutoSlide called, clearing existing interval:', this.carouselInterval);
      // 检查轮播图数据是否可用
      if (!this.carouselImages || this.carouselImages.length === 0) {
        console.error('Carousel images are not available, cannot start auto slide');
        return;
      }
      // 清除现有的定时器
      if (this.carouselInterval) {
        clearTimeout(this.carouselInterval);
      }
      // 设置新的定时器
      this.carouselInterval = setTimeout(() => {
        console.log('Auto slide timer triggered, calling nextSlide');
        this.nextSlide();
        // 递归调用，实现持续自动轮播
        this.startAutoSlide();
      }, 3000);
      console.log('startAutoSlide completed, new interval:', this.carouselInterval);
    },
    
    /**
     * 路由导航方法
     * @param {string} path - 目标路由路径
     */
    navigateTo(path) {
      navigateTo(this.$router, path);
    },
    
    /**
     * 筛选景点
     * @param {string} category - 筛选类别
     */
    filterAttractions(category) {
      this.$store.commit('setAttractionFilter', category);
    },
    
    /**
     * 筛选美食
     * @param {string} category - 筛选类别
     */
    filterFoods(category) {
      this.$store.commit('setFoodFilter', category);
    },
    
    /**
     * 设置评分
     * @param {number} rating - 评分值
     */
    setRating(rating) {
      this.feedback.rating = rating;
    },
    
    /**
     * 验证留言表单字段
     * @param {string} field - 字段名
     */
    validateFeedbackField(field) {
      let error = '';
      const value = this.feedback[field];
      
      if (field === 'name') {
        if (!value) {
          error = '请输入姓名';
        } else if (value.length < 2) {
          error = '姓名至少需要2个字符';
        }
      } else if (field === 'email') {
        if (!value) {
          error = '请输入邮箱';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = '请输入有效的邮箱地址';
        }
      }
      
      this.feedback.errors[field] = error;
    },
    
    /**
     * 提交留言
     */
    submitFeedback() {
      // 检查是否登录
      if (!this.currentUser) {
        // 未登录，跳转到登录页面
        window.location.href = 'login.html';
        return;
      }
      
      // 验证必填字段
      if (this.feedback.rating === 0 || !this.feedback.content.trim()) {
        // 显示错误提示
        if (this.feedback.errors) {
          this.feedback.errors.general = '请填写所有必填字段';
        } else {
          this.feedback.errors = { general: '请填写所有必填字段' };
        }
        return;
      }
      
      // 添加loading状态
      this.feedback.isSubmitting = true;
      
      // 创建新的留言对象
      const newFeedback = {
        name: this.currentUser.name,
        avatar: this.currentUser.avatar,
        rating: this.feedback.rating,
        date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
        content: this.feedback.content,
        id: Date.now(), // 添加唯一ID用于Vue的key绑定
        likes: 0,
        replies: 0
      };
      
      // 使用Vuex store的action提交留言
      this.$store.dispatch('submitFeedback', newFeedback)
        .then(data => {
          // 清空表单
          this.feedback = {
            name: '',
            email: '',
            subject: '',
            content: '',
            rating: 0,
            errors: {
              name: '',
              email: ''
            },
            isSubmitting: false,
            submitSuccess: true
          };
          
          // 3秒后自动隐藏成功提示
          setTimeout(() => {
            this.feedback.submitSuccess = false;
          }, 3000);
        })
        .catch(error => {
          console.error('提交失败:', error);
          // 显示错误提示
          if (this.feedback.errors) {
            this.feedback.errors.general = '网络错误，请检查连接后重试';
          } else {
            this.feedback.errors = { general: '网络错误，请检查连接后重试' };
          }
          this.feedback.isSubmitting = false;
        });
    },
    
    /**
     * 打开登录模态框
     */
    openLoginModal() {
      this.loginModalVisible = true;
      // 触发重绘以激活过渡动画
      this.modalReady = false;
      setTimeout(() => {
        this.modalReady = true;
        // 模态框打开后生成验证码
        this.generateCaptcha();
      }, 10);
    },
    
    /**
     * 关闭登录模态框
     */
    closeLoginModal() {
      this.modalReady = false;
      setTimeout(() => {
        this.loginModalVisible = false;
      }, 300);
    },
    
    /**
     * 验证登录表单字段
     * @param {string} field - 字段名
     */
    validateLoginField(field) {
      let error = '';
      const value = this.login[field];
      if (field === 'email') {
        if (!value) {
          error = '请输入邮箱';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = '请输入有效的邮箱地址';
        }
      } else if (field === 'password') {
        if (!value) {
          error = '请输入密码';
        } else if (value.length < 6) {
          error = '密码长度至少需要6个字符';
        }
      } else if (field === 'captcha') {
        if (!value) {
          error = '请输入验证码';
        } else if (value.length !== 4) {
          error = '验证码长度不正确';
        } else if (window.captchaCode && value.toLowerCase() !== window.captchaCode.toLowerCase()) {
          error = '验证码错误';
        }
      }
      this.login.errors[field] = error;
    },
    
    /**
     * 生成验证码
     */
    generateCaptcha() {
      const canvas = document.getElementById('captchaCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      // 生成随机验证码
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let captcha = '';
      for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      window.captchaCode = captcha;
      
      // 绘制验证码
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 设置背景
      ctx.fillStyle = '#F5F7FA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 绘制干扰线
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
      
      // 绘制干扰点
      ctx.fillStyle = '#D4AF37';
      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // 绘制验证码文本
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // 为每个字符设置不同的颜色和旋转角度
      const colors = ['#D4AF37', '#C5A335', '#B69732', '#A78B2F'];
      for (let i = 0; i < captcha.length; i++) {
        ctx.fillStyle = colors[i % colors.length];
        ctx.save();
        ctx.translate(25 + i * 20, canvas.height / 2);
        ctx.rotate((Math.random() - 0.5) * 0.4);
        ctx.fillText(captcha[i], 0, 0);
        ctx.restore();
      }
    },
    
    // 登录用户
    loginUser() {
      // 先验证所有字段
      this.validateLoginField('email');
      this.validateLoginField('password');
      this.validateLoginField('captcha');
      
      // 如果有错误，不继续执行
      if (this.login.errors.email || this.login.errors.password || this.login.errors.captcha) {
        return;
      }
      
      // 显示加载状态
      this.login.isLoading = true;
      this.login.message = '正在登录...';
      this.login.isSuccess = false;
      
      // 检查验证码
      if (this.login.captcha.toLowerCase() !== window.captchaCode.toLowerCase()) {
        this.login.message = '验证码错误';
        this.login.isSuccess = false;
        // 重新生成验证码
        if (window.generateCaptcha) {
          window.generateCaptcha();
        }
        this.login.captcha = '';
        this.login.isLoading = false;
        return;
      }
      
      // 调用后端登录API
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.login.email,
          password: this.login.password
        })
      })
      .then(response => response.json())
      .then(data => {
        this.login.isLoading = false;
        
        if (data.success) {
          this.login.message = '登录成功，正在跳转...';
          this.login.isSuccess = true;
          
          // 设置当前用户信息
          this.currentUser = {
            name: data.user.name,
            avatar: `assets/images/users/user${Math.floor(Math.random() * 10) + 1}.jpg`
          };
          
          // 保存用户信息到本地存储（如果选择了"记住我"）
          if (this.login.remember) {
            localStorage.setItem('user', JSON.stringify({
              email: data.user.email,
              name: data.user.name
            }));
          } else {
            localStorage.removeItem('user');
          }
          
          // 保存登录状态
          localStorage.setItem('isLoggedIn', 'true');
          
          // 延迟跳转，让用户有时间看到成功消息
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
        } else {
          this.login.message = data.message || '邮箱或密码错误，请重试';
          this.login.isSuccess = false;
          // 重新生成验证码
          if (window.generateCaptcha) {
            window.generateCaptcha();
          }
          this.login.captcha = '';
        }
      })
      .catch(error => {
        console.error('登录失败:', error);
        this.login.isLoading = false;
        this.login.message = '登录失败，请检查网络连接或稍后重试';
        this.login.isSuccess = false;
      });
    },
    
    // 切换密码可见性
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    
    // 切换确认密码可见性
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
    
    /**
     * 验证注册表单字段
     * @param {string} field - 字段名
     */
    validateRegisterField(field) {
      let error = '';
      const value = this.register[field];
      
      switch(field) {
        case 'name':
          if (!value) {
            error = '请输入姓名';
          }
          break;
        case 'email':
          if (!value) {
            error = '请输入邮箱';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = '请输入有效的邮箱地址';
          }
          break;
        case 'password':
          if (!value) {
            error = '请输入密码';
          } else if (value.length < 6) {
            error = '密码长度至少需要6个字符';
          }
          break;
        case 'confirmPassword':
          if (!value) {
            error = '请确认密码';
          } else if (value !== this.register.password) {
            error = '两次输入的密码不一致';
          }
          break;
        case 'terms':
          if (!value) {
            error = '请同意服务条款和隐私政策';
          }
          break;
      }
      
      this.register.errors[field] = error;
    },
    
    /**
     * 用户注册
     */
    registerUser() {
      // 验证所有字段
      this.validateRegisterField('name');
      this.validateRegisterField('email');
      this.validateRegisterField('password');
      this.validateRegisterField('confirmPassword');
      this.validateRegisterField('terms');
      
      // 检查是否有错误
      if (Object.values(this.register.errors).some(error => error)) {
        return;
      }
      
      // 显示加载状态和注册消息
      this.register.isLoading = true;
      this.register.message = '正在注册...';
      this.register.isSuccess = false;
      
      // 调用注册API
      fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        })
      })
      .then(response => response.json())
      .then(data => {
        this.register.isLoading = false;
        
        if (data.success) {
          this.register.message = '注册成功！正在跳转到登录页面...';
          this.register.isSuccess = true;
          
          // 延迟跳转
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          this.register.message = data.message;
          this.register.isSuccess = false;
        }
      })
      .catch(error => {
        console.error('注册失败:', error);
        this.register.isLoading = false;
        this.register.message = '注册失败，请检查网络连接或稍后重试';
        this.register.isSuccess = false;
      });
    },
    
    // 检查用户是否已登录
    isUserLoggedIn() {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          return user.isLoggedIn;
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
      return false;
    },
    
    // 跳转到注册页面
    goToRegister() {
      if (this.isUserLoggedIn()) {
        alert('您已登录！');
        return;
      }
      window.location.href = 'register.html';
    },
    
    // 跳转到登录页面
    goToLogin() {
      if (this.isUserLoggedIn()) {
        alert('您已登录！');
        return;
      }
      window.location.href = 'login.html';
    },
    
    /**
     * 用户登录
     */
    handleLogin() {
      // 验证登录字段
      this.validateLoginField('email');
      this.validateLoginField('password');
      
      if (this.login.errors.email || this.login.errors.password) {
        return;
      }
      
      // 模拟登录成功
      this.currentUser = {
        name: this.login.email.split('@')[0],
        avatar: `assets/images/users/user${Math.floor(Math.random() * 10) + 1}.jpg`
      };
      
      this.closeLoginModal();
      alert('登录成功！');
    },
    
    /**
     * 打开景点详情
     * @param {number} id - 景点ID
     */
    openAttractionDetail(id) {
      alert(`查看景点详情：ID ${id}`);
      // 实际项目中应实现详情页或模态框
    },
    
    /**
     * 打开美食详情
     * @param {number} id - 美食ID
     */
    openFoodDetail(id) {
      // 根据美食ID获取美食信息
      const food = this.foods.find(item => item.id === id);
      
      // 根据美食名称或标签导航到对应的详情页
      if (food) {
        if (food.tags && food.tags.includes('肠粉')) {
          window.location.href = 'changfen-detail.html';
        } else if (food.tags && food.tags.includes('烧鹅')) {
          window.location.href = 'shaoe-detail.html';
        } else if (food.tags && food.tags.includes('虾饺')) {
          window.location.href = 'xiaojiao-detail.html';
        } else {
          alert(`查看美食详情：${food.name}`);
          // 实际项目中应实现详情页或模态框
        }
      } else {
        alert(`查看美食详情：ID ${id}`);
      }
    },
    
    /**
     * 点赞留言
     * @param {number} id - 留言ID
     */
    likeFeedback(id) {
      const feedback = this.feedbacks.find(item => item.id === id);
      if (feedback) {
        feedback.likes = feedback.likes || 0;
        feedback.likes++;
      }
    },
    
    /**
     * 滚动到留言表单
     */
    scrollToFeedbackForm() {
      const feedbackForm = document.getElementById('feedbackForm');
      if (feedbackForm) {
        feedbackForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  computed: {
    // 从store获取轮播图数据
    carouselImages() {
      return this.$store.getters.carouselImages;
    },
    // 从store获取景点数据
    attractions() {
      return this.$store.getters.filteredAttractions;
    },
    // 从store获取美食数据
    foods() {
      return this.$store.getters.filteredFoods;
    },
    // 从store获取用户登录状态
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    // 从store获取反馈数据
    feedbacks() {
      return this.$store.state.feedbacks;
    },
    // 从store获取景点筛选条件
    activeAttractionCategory() {
      return this.$store.state.attractionFilter.category;
    },
    // 从store获取美食筛选条件
    activeFoodCategory() {
      return this.$store.state.foodFilter.category;
    }
  },
  mounted() {
    // 初始化路由
    initRouter(this);
    
    // 从localStorage恢复用户信息
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userInfo = localStorage.getItem('user');
    if (isLoggedIn && userInfo) {
      try {
        const user = JSON.parse(userInfo);
        this.currentUser = {
          name: user.name,
          avatar: `assets/images/users/user${Math.floor(Math.random() * 10) + 1}.jpg`
        };
      } catch (error) {
        console.error('解析用户信息失败:', error);
      }
    }
    
    // 导航栏滚动效果已移至Navbar组件内部
    
    // 加载数据到store
    this.$store.dispatch('loadFeedbacks');
    this.$store.dispatch('loadAttractions');
    this.$store.dispatch('loadFoods');
    
    // 轮播图自动切换
    this.startAutoSlide();
  }
});

// 初始化路由
initRouter(app);
});