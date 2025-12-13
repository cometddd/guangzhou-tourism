<template>
  <div :class="['card-base', cardClass]" @click="handleClick">
    <!-- 图片部分 -->
    <div :class="imageContainerClass">
      <img :src="image" :alt="title" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
    </div>
    
    <!-- 内容部分 -->
    <div :class="contentContainerClass">
      <!-- 标题和分类 -->
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-xl font-bold text-secondary">{{ title }}</h3>
        <span class="bg-primary-opacity-10 text-primary text-xs px-2 py-1 rounded-full">
          {{ categoryLabel }}
        </span>
      </div>
      
      <!-- 描述 -->
      <p class="text-gray-600 mb-4">{{ description }}</p>
      
      <!-- 标签 -->
      <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mb-4">
        <span v-for="tag in tags" :key="tag" class="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
          {{ tag }}
        </span>
      </div>
      
      <!-- 底部信息 -->
      <div :class="bottomContainerClass">
        <!-- 位置信息 -->
        <div v-if="location" class="flex items-center">
          <i class="fa fa-map-marker text-primary mr-1"></i>
          <span class="text-gray-600 text-sm">{{ location }}</span>
        </div>
        
        <!-- 评分 -->
        <div v-if="rating" class="flex items-center">
          <div class="flex text-yellow-400">
            <i v-for="i in 5" :key="i" :class="['fa', i <= Math.floor(rating) ? 'fa-star' : i === Math.floor(rating) + 1 && rating % 1 >= 0.5 ? 'fa-star-half-o' : 'fa-star-o']"></i>
          </div>
          <span class="text-gray-600 text-sm ml-2">{{ rating }}/5</span>
        </div>
        
        <!-- 操作按钮 -->
        <button v-if="actionText" :class="actionButtonClass" @click.stop="handleAction">
          {{ actionText }} <i class="fa fa-arrow-right ml-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    // 卡片类型: 'attraction' 或 'food'
    type: {
      type: String,
      required: true,
      validator: (value) => ['attraction', 'food'].includes(value)
    },
    // 卡片数据
    data: {
      type: Object,
      required: true
    },
    // 点击事件
    onClick: {
      type: Function,
      default: null
    },
    // 操作按钮点击事件
    onAction: {
      type: Function,
      default: null
    },
    // 操作按钮文本
    actionText: {
      type: String,
      default: null
    }
  },
  computed: {
    // 卡片基本类名
    cardClass() {
      return this.type === 'food' ? 'flex flex-col md:flex-row food-card food-card--hover' : 'attraction-card attraction-card--hover';
    },
    // 图片容器类名
    imageContainerClass() {
      return this.type === 'food' ? 'md:w-1/2 h-64 md:h-auto overflow-hidden' : 'h-64 overflow-hidden';
    },
    // 内容容器类名
    contentContainerClass() {
      return this.type === 'food' ? 'md:w-1/2 p-6 flex flex-col justify-center' : 'p-6';
    },
    // 底部容器类名
    bottomContainerClass() {
      return this.type === 'food' ? 'flex items-center mt-auto' : 'flex justify-between items-center';
    },
    // 操作按钮类名
    actionButtonClass() {
      return this.type === 'food' ? 'ml-auto text-primary hover:text-accent transition-colors' : 'text-primary hover:text-accent transition-colors';
    },
    // 图片URL
    image() {
      return this.data.image || '';
    },
    // 标题
    title() {
      return this.data.name || '';
    },
    // 描述
    description() {
      return this.data.description || '';
    },
    // 分类标签
    categoryLabel() {
      if (!this.data.category) return '';
      
      if (this.type === 'attraction') {
        const categoryMap = {
          'modern': '现代建筑',
          'history': '历史古迹',
          'natural': '自然景观'
        };
        return categoryMap[this.data.category] || this.data.category;
      } else {
        const categoryMap = {
          'dimsum': '早茶点心',
          'roast': '烧腊卤味',
          'specialty': '特色小吃',
          'dessert': '甜品糕点'
        };
        return categoryMap[this.data.category] || this.data.category;
      }
    },
    // 标签
    tags() {
      return this.data.tags || [];
    },
    // 位置
    location() {
      return this.data.location || null;
    },
    // 评分
    rating() {
      return this.data.rating || null;
    }
  },
  methods: {
    // 处理卡片点击
    handleClick() {
      if (this.onClick) {
        this.onClick(this.data.id);
      }
    },
    // 处理操作按钮点击
    handleAction() {
      if (this.onAction) {
        this.onAction(this.data.id);
      }
    }
  }
}
</script>