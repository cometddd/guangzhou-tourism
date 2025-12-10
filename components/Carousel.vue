<template>
  <div class="relative w-full h-full">
    <!-- 轮播图图片 -->
    <div class="absolute inset-0 z-0" v-cloak>
      <div v-for="(item, index) in images" :key="index" 
           class="carousel-item absolute inset-0" 
           :style="{opacity: currentIndex === index ? 1 : 0}">
        <img :src="item.src" :alt="item.alt" class="w-full h-full object-cover">
      </div>
      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>
    
    <!-- 手动控制按钮 -->
    <div class="absolute inset-0 z-10 flex items-center justify-between px-4">
      <button class="bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-all" @click="prevSlide">
        <i class="fa fa-chevron-left text-xl"></i>
      </button>
      <button class="bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-all" @click="nextSlide">
        <i class="fa fa-chevron-right text-xl"></i>
      </button>
    </div>
    
    <!-- 指示器 -->
    <div class="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
      <button v-for="(item, index) in images" :key="index" 
              class="w-3 h-3 rounded-full transition-all" 
              :class="currentIndex === index ? 'bg-white w-8' : 'bg-white/50'"
              @click="goToSlide(index)">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    // 轮播图图片数组
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    // 自动轮播间隔时间（毫秒）
    interval: {
      type: Number,
      default: 5000
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null
    };
  },
  methods: {
    // 下一张
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    // 上一张
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    // 跳转到指定幻灯片
    goToSlide(index) {
      if (index >= 0 && index < this.images.length) {
        this.currentIndex = index;
      }
    },
    // 开始自动播放
    startAutoPlay() {
      if (this.autoPlay && this.images.length > 1) {
        this.timer = setInterval(() => {
          this.nextSlide();
        }, this.interval);
      }
    },
    // 停止自动播放
    stopAutoPlay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeDestroy() {
    this.stopAutoPlay();
  },
  // 监听图片数组变化，重新开始自动播放
  watch: {
    images() {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }
}
</script>