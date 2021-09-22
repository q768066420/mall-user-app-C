<template>
  <div class="side-bar-container" ref="side">
    <div
      :class="{ active: index === i }"
      v-for="(item, i) in sidebarList"
      :key="i"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ i === 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { moveScroll } from '../utils';

export default {
  created() {
    this.$store.dispatch('acGetGoodsList', {
      type: this.sidebarList[0],
      page: 1,
      size: 5,
    });
  },
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState(['sidebarList']),
  },
  methods: {
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const itemOL = e.target.getBoundingClientRect().top;
      const sideOL = this.$refs.side.getBoundingClientRect().top;
      const itemOW = e.target.offsetHeight;
      const wrapperHeight = this.$refs.side.clientHeight;
      const changeDisX = itemOL - sideOL - wrapperHeight / 2 + itemOW / 2;
      moveScroll(
        this.$refs.side.scrollTop,
        changeDisX,
        this.$refs.side,
        'scrollTop',
      );
      // 点击赛选二级列表
      this.$store.dispatch('acRequestGoodList');
      window.console.log(this.sidebarList[i]);
      this.$store.dispatch('acGetGoodsList', {
        type: this.sidebarList[i],
        page: 1,
        size: 5,
      });
    },
  },
};
</script>

<style lang='less' scoped>
.side-bar-container {
  width: 79px;
  position: fixed;
  left: 0;
  top: 135px;
  bottom: 50px;
  overflow: auto;
  background: #f8f8f8;
  div {
    width: 79px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .side-bar-container::-webkit-scrollbar {
    width: 0;
    background: none;
  }
}
</style>
