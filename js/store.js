// 创建Vuex Store
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
      { src: 'assets/images/Attraction/guangzhouta.webp', alt: '广州塔夜景' },
      { src: 'assets/images/Attraction/chenjiaci.png', alt: '陈家祠' },
      { src: 'assets/images/food/广州早茶.webp', alt: '早茶' }
    ],
    // 全局数据
    attractions: [],
    foods: [],
    feedbacks: []
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
    },
    // 设置美食数据
    setFoods(state, foods) {
      state.foods = foods;
    },
    // 设置留言数据
    setFeedbacks(state, feedbacks) {
      state.feedbacks = feedbacks;
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
      return fetch('data/attractions.json')
        .then(response => response.json())
        .then(data => {
          commit('setAttractions', data);
          return data;
        })
        .catch(error => {
          console.error('Failed to load attractions:', error);
          return [];
        });
    },
    // 加载美食数据
    loadFoods({ commit }) {
      return fetch('data/foods.json')
        .then(response => response.json())
        .then(data => {
          commit('setFoods', data);
          return data;
        })
        .catch(error => {
          console.error('Failed to load foods:', error);
          return [];
        });
    },
    // 加载留言数据
    loadFeedbacks({ commit }) {
      return fetch('data/feedback.json')
        .then(response => response.json())
        .then(data => {
          commit('setFeedbacks', data);
          return data;
        })
        .catch(error => {
          console.error('Failed to load feedbacks:', error);
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
    carouselImages: state => state.carouselImages
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