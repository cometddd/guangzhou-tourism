/**
 * Vuex Store - 全局状态管理
 */
const store = new Vuex.Store({
  state: {
    // 用户登录状态
    user: {
      isLoggedIn: false,
      email: '',
      name: '',
      token: ''
    },
    // 景点筛选条件
    attractionFilter: {
      category: 'all'
    },
    // 美食筛选条件
    foodFilter: {
      category: 'all'
    },
    // 当前选中的景点ID
    selectedAttractionId: null,
    // 当前选中的美食ID
    selectedFoodId: null,
    // 轮播图数据
    carouselImages: [
      { src: 'assets/images/Attraction/guangzhouta.webp', alt: '广州塔' },
      { src: 'assets/images/Attraction/chenjiaci.png', alt: '陈家祠' },
      { src: 'assets/images/food/广州早茶.jpg', alt: '早茶' }
    ],
    // 收藏数据
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    // 全局数据
    attractions: [],
    foods: [],
    feedbacks: [],
    // 加载状态
    loading: {
      attractions: false,
      foods: false,
      feedbacks: false
    }
  },
  mutations: {
    // 设置用户登录状态
    setUser(state, userData) {
      state.user = {
        isLoggedIn: true,
        email: userData.email,
        name: userData.name || '',
        token: userData.token || ''
      };
      // 保存到localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    // 清除用户登录状态
    clearUser(state) {
      state.user = {
        isLoggedIn: false,
        email: '',
        name: '',
        token: ''
      };
      // 从localStorage清除
      localStorage.removeItem('user');
    },
    // 设置景点筛选条件
    setAttractionFilter(state, category) {
      state.attractionFilter.category = category;
    },
    // 设置美食筛选条件
    setFoodFilter(state, category) {
      state.foodFilter.category = category;
    },
    // 设置选中的景点ID
    setSelectedAttractionId(state, id) {
      state.selectedAttractionId = id;
    },
    // 设置选中的美食ID
    setSelectedFoodId(state, id) {
      state.selectedFoodId = id;
    },
    // 设置景点数据
    setAttractions(state, attractions) {
      state.attractions = attractions;
      state.loading.attractions = false;
    },
    // 设置美食数据
    setFoods(state, foods) {
      console.log('Setting foods in state:', foods);
      state.foods = foods;
      state.loading.foods = false;
    },
    // 设置留言数据
    setFeedbacks(state, feedbacks) {
      state.feedbacks = feedbacks;
      state.loading.feedbacks = false;
      // 保存到localStorage实现持久化
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    },
    // 设置加载状态
    setLoading(state, { type, isLoading }) {
      state.loading[type] = isLoading;
    },
    // 添加收藏
    addFavorite(state, favorite) {
      state.favorites.push(favorite);
      // 保存到localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    // 移除收藏
    removeFavorite(state, favorite) {
      state.favorites = state.favorites.filter(item => !(item.id === favorite.id && item.category === favorite.category));
      // 更新localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
  },
  actions: {
    // 登录
    login({ commit }, userData) {
      return new Promise((resolve, reject) => {
        // 模拟登录请求
        setTimeout(() => {
          commit('setUser', userData);
          resolve();
        }, 500);
      });
    },
    // 登出
    logout({ commit }) {
      commit('clearUser');
    },
    // 加载景点数据
    loadAttractions({ commit }) {
      console.log('loadAttractions action called');
      commit('setLoading', { type: 'attractions', isLoading: true });
      
      // 直接在代码中定义景点数据，不再从JSON文件加载
      const attractionsData = [
        {
          "id": 1,
          "name": "广州塔",
          "category": "modern",
          "image": "assets/images/Attraction/guangzhouta.webp",
          "description": "中国第一高塔，世界第三高塔，可俯瞰珠江美景和城市天际线。",
          "location": "海珠区"
        },
        {
          "id": 2,
          "name": "陈家祠",
          "category": "history",
          "image": "assets/images/Attraction/chenjiaci.png",
          "description": "广东民间工艺博物馆，集岭南建筑艺术之大成，被誉为“岭南建筑明珠”。",
          "location": "荔湾区"
        },
        {
          "id": 3,
          "name": "沙面岛",
          "category": "history",
          "image": "assets/images/Attraction/shamiandao.webp",
          "description": "历史租界区，保存了大量欧式建筑，是广州著名的外事游览区和历史文物保护区。",
          "location": "荔湾区"
        },
        {
          "id": 4,
          "name": "白云山",
          "category": "nature",
          "image": "assets/images/Attraction/baiyunshan.jpg",
          "description": "南粤名山之一，自古就有“羊城第一秀”之称，是广州著名的风景区。",
          "location": "白云区"
        },
        {
          "id": 5,
          "name": "越秀公园",
          "category": "nature",
          "image": "assets/images/Attraction/yuexiupark.png",
          "description": "广州最大的综合性公园，以西汉时南越王赵佗曾在山上建“朝汉台”而得名。",
          "location": "越秀区"
        },
        {
          "id": 6,
          "name": "广州大剧院",
          "category": "modern",
          "image": "assets/images/Attraction/广州塔2.webp",
          "description": "由英国设计师扎哈·哈迪德设计，被称为“圆润双砾”，是广州的新地标。",
          "location": "天河区"
        },
        {
          "id": 7,
          "name": "石室圣心大教堂",
          "category": "history",
          "image": "assets/images/Attraction/guangzhouta.webp",
          "description": "广州最宏伟的天主教堂，哥特式建筑风格，是广州的重要地标。",
          "location": "越秀区"
        },
        {
          "id": 8,
          "name": "黄埔古港",
          "category": "history",
          "image": "assets/images/Attraction/chenjiaci.png",
          "description": "古代海上丝绸之路的重要港口，保存了大量历史遗迹。",
          "location": "海珠区"
        },
        {
          "id": 9,
          "name": "中山纪念堂",
          "category": "history",
          "image": "assets/images/Attraction/shamiandao.webp",
          "description": "纪念孙中山先生的重要建筑，具有浓厚的民族风格。",
          "location": "越秀区"
        },
        {
          "id": 10,
          "name": "广州长隆野生动物世界",
          "category": "nature",
          "image": "assets/images/Attraction/baiyunshan.jpg",
          "description": "世界顶级的野生动物主题公园，拥有多种珍稀动物。",
          "location": "番禺区"
        },
        {
          "id": 11,
          "name": "广州图书馆",
          "category": "modern",
          "image": "assets/images/Attraction/yuexiupark.png",
          "description": "现代化的大型公共图书馆，是广州的文化地标。",
          "location": "天河区"
        },
        {
          "id": 12,
          "name": "珠江夜游",
          "category": "modern",
          "image": "assets/images/Attraction/广州塔2.webp",
          "description": "欣赏珠江两岸夜景的最佳方式，感受广州的现代化魅力。",
          "location": "越秀区"
        },
        {
          "id": 13,
          "name": "陈家祠",
          "category": "history",
          "image": "assets/images/Attraction/guangzhouta.webp",
          "description": "广东民间工艺博物馆，集岭南建筑艺术之大成，被誉为“岭南建筑明珠”。",
          "location": "荔湾区"
        }
      ];
      
      // 处理图片路径，确保Edge浏览器兼容性
      const processedAttractions = attractionsData.map(attraction => {
        // 如果attraction有图片属性，处理图片路径
        if (attraction.image) {
          // 确保使用正确的相对路径
          let imagePath = attraction.image;
          if (imagePath.startsWith('/')) {
            imagePath = imagePath.substring(1);
          }
          // 对中文文件名进行编码，提高Edge浏览器兼容性
          try {
            // 只编码路径中的文件名部分
            const pathParts = imagePath.split('/');
            const fileName = pathParts.pop();
            const encodedFileName = encodeURIComponent(fileName);
            imagePath = pathParts.concat(encodedFileName).join('/');
          } catch (e) {
            console.error('Error encoding image path:', e);
          }
          
          console.log(`Processing attraction ${attraction.name}: original path=${attraction.image}, processed path=${imagePath}`);
          return {
            ...attraction,
            image: imagePath
          };
        }
        return attraction;
      });
      
      console.log('Processed attractions with compatible image paths:', processedAttractions);
      commit('setAttractions', processedAttractions);
      commit('setLoading', { type: 'attractions', isLoading: false });
      return processedAttractions;
    },
    // 加载美食数据
    loadFoods({ commit }) {
      console.log('loadFoods action called');
      commit('setLoading', { type: 'foods', isLoading: true });
      
      // 直接在代码中定义美食数据，不再从JSON文件加载
      const foodsData = [
        {"id":7,"name":"肠粉","category":"dimsum","image":"/assets/images/food/changfen.jpg","description":"广州特色点心，薄如纸的米皮包裹丰富馅料","tags":["肠粉","早茶","米制品","清淡"],"rating":4.9},
        {"id":8,"name":"烧鹅","category":"roast","image":"/assets/images/food/shaoe.jpg","description":"粤菜经典，皮脆肉嫩的传统美食","tags":["烧鹅","烧腊","粤菜","皮脆肉嫩"],"rating":4.9},
        {"id":9,"name":"虾饺","category":"dimsum","image":"/assets/images/food/xiaojiao.jpg","description":"广式早茶四大天王之一，水晶皮包裹鲜虾","tags":["虾饺","早茶","点心","鲜虾"],"rating":4.9},
        {"id":3,"name":"白切鸡","category":"specialty","image":"/assets/images/food/白切鸡.png","description":"广东名菜，皮黄肉白，肥嫩鲜美","tags":["粤菜","清淡","原汁原味"],"rating":4.6},
        {"id":4,"name":"云吞面","category":"specialty","image":"/assets/images/food/yuntunmian.jpg","description":"广东特色面食，汤底浓郁","tags":["面食","汤面","鲜虾云吞"],"rating":4.5},
        {"id":5,"name":"艇仔粥","category":"specialty","image":"/assets/images/food/艇仔粥.png","description":"广东粥品，以新鲜的鱼片等熬制","tags":["粥品","海鲜","传统美食"],"rating":4.4},
        {"id":6,"name":"姜撞奶","category":"dessert","image":"/assets/images/food/jiangzhuangnai.jpg","description":"广东甜品，香甜微辣","tags":["甜品","牛奶","姜味"],"rating":4.3}
      ];
      
      // 处理图片路径，确保Edge浏览器兼容性
      const processedFoods = foodsData.map(food => {
        // 确保使用正确的相对路径
        let imagePath = food.image;
        if (imagePath.startsWith('/')) {
          imagePath = imagePath.substring(1);
        }
        // 对中文文件名进行编码，提高Edge浏览器兼容性
        try {
          // 只编码路径中的文件名部分
          const pathParts = imagePath.split('/');
          const fileName = pathParts.pop();
          const encodedFileName = encodeURIComponent(fileName);
          imagePath = pathParts.concat(encodedFileName).join('/');
        } catch (e) {
          console.error('Error encoding image path:', e);
        }
        
        console.log(`Processing food ${food.name}: original path=${food.image}, processed path=${imagePath}`);
        return {
          ...food,
          image: imagePath
        };
      });
      
      console.log('Processed foods with compatible image paths:', processedFoods);
      commit('setFoods', processedFoods);
      commit('setLoading', { type: 'foods', isLoading: false });
      return processedFoods;
    },
    // 加载留言数据
    loadFeedbacks({ commit }) {
      console.log('loadFeedbacks action called');
      commit('setLoading', { type: 'feedbacks', isLoading: true });
      
      // 尝试从localStorage加载评论数据
      const savedFeedbacks = localStorage.getItem('feedbacks');
      
      if (savedFeedbacks) {
        // 如果localStorage中有数据，使用这些数据
        try {
          const feedbacksData = JSON.parse(savedFeedbacks);
          console.log('Loaded feedbacks from localStorage:', feedbacksData);
          commit('setFeedbacks', feedbacksData);
          commit('setLoading', { type: 'feedbacks', isLoading: false });
          return feedbacksData;
        } catch (error) {
          console.error('Failed to parse saved feedbacks:', error);
          // 如果localStorage数据解析失败，从JSON文件加载
        }
      }
      
      // 从JSON文件加载初始数据
      return fetch('assets/data/feedbacks.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load feedbacks data');
          }
          return response.json();
        })
        .then(feedbacksData => {
          // 为每条留言添加缺失的字段
          const processedFeedbacks = feedbacksData.map((feedback, index) => ({
            ...feedback,
            id: feedback.id || index + 1,
            likes: feedback.likes || 0,
            replies: feedback.replies || 0
          }));
          
          console.log('Loaded feedbacks from JSON file:', processedFeedbacks);
          commit('setFeedbacks', processedFeedbacks);
          commit('setLoading', { type: 'feedbacks', isLoading: false });
          return processedFeedbacks;
        })
        .catch(error => {
          console.error('Failed to load feedbacks from JSON file:', error);
          // 如果加载失败，使用空数组
          commit('setFeedbacks', []);
          commit('setLoading', { type: 'feedbacks', isLoading: false });
          return [];
        });
    },
    // 提交留言
    submitFeedback({ commit, state }, feedback) {
      return new Promise((resolve, reject) => {
        // 模拟提交请求
        setTimeout(() => {
          const newFeedback = {
            ...feedback,
            id: Date.now(),
            date: new Date().toISOString()
          };
          const updatedFeedbacks = [...state.feedbacks, newFeedback];
          commit('setFeedbacks', updatedFeedbacks);
          // 这里可以添加保存到服务器的逻辑
          resolve(newFeedback);
        }, 500);
      });
    },
    // 添加收藏
    addFavorite({ commit }, favorite) {
      commit('addFavorite', favorite);
    },
    // 移除收藏
    removeFavorite({ commit }, favorite) {
      commit('removeFavorite', favorite);
    }
  },
  getters: {
    // 获取用户登录状态
    isLoggedIn: state => state.user.isLoggedIn,
    // 获取用户信息
    user: state => state.user,
    // 获取景点筛选条件
    attractionFilter: state => state.attractionFilter,
    // 获取美食筛选条件
    foodFilter: state => state.foodFilter,
    // 获取筛选后的景点数据
    filteredAttractions: state => {
      if (state.attractionFilter.category === 'all') {
        return state.attractions;
      }
      return state.attractions.filter(attraction => attraction.category === state.attractionFilter.category);
    },
    // 获取筛选后的美食数据
    filteredFoods: state => {
      if (state.foodFilter.category === 'all') {
        return state.foods;
      }
      return state.foods.filter(food => food.category === state.foodFilter.category);
    },
    // 获取当前选中的景点
    selectedAttraction: state => {
      if (!state.selectedAttractionId) return null;
      return state.attractions.find(attraction => attraction.id === state.selectedAttractionId) || null;
    },
    // 获取当前选中的美食
    selectedFood: state => {
      if (!state.selectedFoodId) return null;
      return state.foods.find(food => food.id === state.selectedFoodId) || null;
    },
    // 获取轮播图数据
    carouselImages: state => state.carouselImages,
    // 检查项目是否已收藏
    isFavorite: state => (item) => {
      return state.favorites.some(favorite => favorite.id === item.id && favorite.category === (item.category || item.type || 'other'));
    }
  }
});

// 从localStorage恢复用户状态
const savedUser = localStorage.getItem('user');
if (savedUser) {
  try {
    const userData = JSON.parse(savedUser);
    store.commit('setUser', userData);
  } catch (error) {
    console.error('Failed to parse saved user data:', error);
  }
}