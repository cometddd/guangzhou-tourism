// 定义全局数据
const data = {
  // 导航栏状态
  mobileMenuVisible: false,
  loginModalVisible: false,
  modalReady: false,
  
  // 轮播图数据
  carouselImages: [
    { src: 'assets/images/Attraction/guangzhouta.webp', alt: '广州塔夜景' },
    { src: 'assets/images/Attraction/chenjiaci.png', alt: '陈家祠' },
    { src: 'assets/images/food/广州早茶.webp', alt: '早茶' }
  ],
  currentIndex: 0,
  
  // 筛选状态
  activeAttractionCategory: 'all',
  activeFoodCategory: 'all',
  
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
    remember: false,
    errors: {
      email: '',
      password: ''
    }
  },
  
  // 数据
  feedbacks: [],
  attractions: [],
  foods: []
};

// 创建Vue实例
const app = new Vue({
  el: '.vue-form',
  data: data,
  methods: {
    // 切换移动端菜单
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
    },
    
    // 轮播图切换
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    },
    
    // 筛选景点
    filterAttractions(category) {
      this.activeAttractionCategory = category;
      this.renderAttractionCards();
    },
    
    // 筛选美食
    filterFoods(category) {
      this.activeFoodCategory = category;
      this.renderFoodCards();
    },
    
    // 设置评分
    setRating(rating) {
      this.feedback.rating = rating;
    },
    
    // 验证表单字段
    validateField(field) {
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
    
    // 提交留言
    submitFeedback() {
      // 验证必填字段
      this.validateField('name');
      this.validateField('email');
      
      if (this.feedback.errors.name || this.feedback.errors.email || this.feedback.rating === 0) {
        return;
      }
      
      // 添加loading状态
      this.feedback.isSubmitting = true;
      
      // 模拟表单提交延迟
      setTimeout(() => {
        // 创建新的留言对象
        const newFeedback = {
          name: this.feedback.name,
          avatar: `assets/images/users/user${Math.floor(Math.random() * 10) + 1}.jpg`,
          rating: this.feedback.rating,
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
          content: this.feedback.content,
          id: Date.now() // 添加唯一ID用于Vue的key绑定
        };
        
        // 添加到留言列表
        this.feedbacks.unshift(newFeedback);
        
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
      }, 1000);
    },
    
    // 打开登录模态框
    openLoginModal() {
      this.loginModalVisible = true;
      // 触发重绘以激活过渡动画
      this.modalReady = false;
      setTimeout(() => {
        this.modalReady = true;
      }, 10);
    },
    
    // 关闭登录模态框
    closeLoginModal() {
      this.modalReady = false;
      setTimeout(() => {
        this.loginModalVisible = false;
      }, 300);
    },
    
    // 验证登录字段
    validateLoginField(field) {
      let error = '';
      const value = this.login[field];
      
      if (field === 'email') {
        if (!value) {
          error = '请输入邮箱';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = '请输入有效的邮箱地址';
        }
      } else if (field === 'password') {
        if (!value) {
          error = '请输入密码';
        } else if (value.length < 6) {
          error = '密码长度至少需要6个字符';
        }
      }
      
      this.login.errors[field] = error;
    },
    
    // 用户登录
    loginUser() {
      // 验证登录字段
      this.validateLoginField('email');
      this.validateLoginField('password');
      
      if (this.login.errors.email || this.login.errors.password) {
        return;
      }
      
      // 模拟登录成功
      this.closeLoginModal();
      alert('登录成功！');
    },
    
    // 渲染景点卡片
    renderAttractionCards() {
      const attractionCards = document.getElementById('attractionCards');
      attractionCards.innerHTML = '';
      
      // 筛选景点
      const filteredAttractions = this.activeAttractionCategory === 'all' 
        ? this.attractions 
        : this.attractions.filter(attraction => attraction.category === this.activeAttractionCategory);
      
      filteredAttractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = `card-base card-hover attraction-card`;
        card.dataset.category = attraction.category;
        card.innerHTML = `
          <div class="h-64 overflow-hidden">
            <img src="${attraction.image}" alt="${attraction.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="p-6">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-bold text-secondary">${attraction.name}</h3>
              <span class="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                ${attraction.category === 'modern' ? '现代建筑' : attraction.category === 'history' ? '历史古迹' : '自然景观'}
              </span>
            </div>
            <p class="text-gray-600 mb-4">
              ${attraction.description}
            </p>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <i class="fa fa-map-marker text-primary mr-1"></i>
                <span class="text-gray-600 text-sm">${attraction.location}</span>
              </div>
              <button class="text-primary hover:text-accent transition-colors" @click="openAttractionDetail(attraction.id)">
                了解更多 <i class="fa fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        `;
        attractionCards.appendChild(card);
      });
    },
    
    // 渲染美食卡片
    renderFoodCards() {
      const foodCards = document.getElementById('foodCards');
      foodCards.innerHTML = '';
      
      // 筛选美食
      const filteredFoods = this.activeFoodCategory === 'all' 
        ? this.foods 
        : this.foods.filter(food => food.category === this.activeFoodCategory);
      
      filteredFoods.forEach(food => {
        const card = document.createElement('div');
        card.className = `card-base flex flex-col md:flex-row card-hover food-card`;
        card.dataset.category = food.category;
        card.innerHTML = `
          <div class="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img src="${food.image}" alt="${food.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="md:w-1/2 p-6 flex flex-col justify-center">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-bold text-secondary">${food.name}</h3>
              <span class="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                ${food.category === 'dimsum' ? '早茶点心' : food.category === 'roast' ? '烧腊卤味' : food.category === 'specialty' ? '特色小吃' : '甜品糕点'}
              </span>
            </div>
            <p class="text-gray-600 mb-4">
              ${food.description}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              ${food.tags.map(tag => `<span class="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">${tag}</span>`).join('')}
            </div>
            <div class="flex items-center mt-auto">
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  ${Array(5).fill().map((_, i) => 
                    i < Math.floor(food.rating) ? 
                    '<i class="fa fa-star"></i>' : 
                    i === Math.floor(food.rating) && food.rating % 1 >= 0.5 ? 
                    '<i class="fa fa-star-half-o"></i>' : 
                    '<i class="fa fa-star-o"></i>'
                  ).join('')}
                </div>
                <span class="text-gray-600 text-sm ml-2">${food.rating}/5</span>
              </div>
              <button class="ml-auto text-primary hover:text-accent transition-colors" @click="openFoodDetail(food.id)">
                查看推荐餐厅 <i class="fa fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        `;
        foodCards.appendChild(card);
      });
    },
    
    // 渲染留言列表
    renderFeedbackList() {
      const feedbackList = document.getElementById('feedbackList');
      feedbackList.innerHTML = '';
      
      this.feedbacks.forEach(feedback => {
        const item = document.createElement('div');
        item.className = 'bg-white rounded-lg shadow-md p-6';
        item.innerHTML = `
          <div class="flex items-start mb-4">
            <div class="flex-shrink-0">
              <img src="${feedback.avatar}" alt="用户头像" class="w-12 h-12 rounded-full object-cover">
            </div>
            <div class="ml-4 flex-1">
              <div class="flex items-center">
                <h4 class="font-bold text-gray-800">${feedback.name}</h4>
                <div class="flex text-yellow-400 text-sm ml-2">
                  ${Array(5).fill().map((_, i) => 
                    i < Math.floor(feedback.rating) ? 
                    '<i class="fa fa-star"></i>' : 
                    i === Math.floor(feedback.rating) && feedback.rating % 1 >= 0.5 ? 
                    '<i class="fa fa-star-half-o"></i>' : 
                    '<i class="fa fa-star-o"></i>'
                  ).join('')}
                </div>
              </div>
              <p class="text-gray-500 text-sm">${feedback.date}</p>
            </div>
          </div>
          <p class="text-gray-600">
            ${feedback.content}
          </p>
        `;
        feedbackList.appendChild(item);
      });
    },
    
    // 打开景点详情（示例方法，实际项目中需实现）
    openAttractionDetail(id) {
      alert(`查看景点详情：ID ${id}`);
      // 实际项目中应实现详情页或模态框
    },
    
    // 打开美食详情（示例方法，实际项目中需实现）
    openFoodDetail(id) {
      alert(`查看美食详情：ID ${id}`);
      // 实际项目中应实现详情页或模态框
    }
  },
  mounted() {
    // 初始化轮播图定时器
    setInterval(() => {
      this.nextSlide();
    }, 5000);
    
    // 导航栏滚动效果
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // 从JSON文件加载数据
    fetch('assets/data/attractions.json')
      .then(response => response.json())
      .then(attractions => {
        this.attractions = attractions;
        // 只有当前页面有attractionCards元素时才调用render函数
        if (document.getElementById('attractionCards')) {
          this.renderAttractionCards();
        }
      });
      
    fetch('assets/data/foods.json')
      .then(response => response.json())
      .then(foods => {
        this.foods = foods;
        // 只有当前页面有foodCards元素时才调用render函数
        if (document.getElementById('foodCards')) {
          this.renderFoodCards();
        }
      });
      
    fetch('assets/data/feedbacks.json')
      .then(response => response.json())
      .then(feedbacks => {
        this.feedbacks = feedbacks;
      });
  }
});