<template>
  <van-tabbar route fixed>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/home/classify" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/home/shopping" icon="cart-o" :badge="badge" id="shop-car"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item to="/my" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      contentMap: (state) => state.contentMap,
    }),
    badge() {
      let coun = Object.values(this.contentMap).reduce(
        (prev, next) => prev + next,
        0,
      );
      if (coun > 99) {
        coun = '99+';
      }
      return coun;
    },
  },
};
</script>

<style>
</style>
