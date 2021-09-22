<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" to="/search" tag="div">
      <van-icon name="search" />
      <div class="search-value">ssdwd</div>
    </router-link>
    <Tabs />
    <template v-if="isLoading">
      <SideBar />
      <GoodsList />
    </template>
    <van-loading v-else size="100"  :vertical='true'/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Tabs from '@/components/Tab.vue';
import SideBar from '@/components/SideBar.vue';
import GoodsList from '@/components/GoodsList.vue';

export default {
  components: {
    Tabs,
    SideBar,
    GoodsList,
  },
  computed: {
    ...mapState(['isLoading']),
  },
};
</script>

<style scoped lang='less'>
.classify-wrapper {
  width: 100%;
  min-height: 100vh;
  position: absolute;
  font-size: 14px;
  .search-btn {
    height: 31.5px;
    line-height: 31.5px;
    width: 355px;
    margin: 10.76px auto 0;
    background: #eee;
    border-radius: 10px;
    text-align: center;
    color: #a1a1a1;
    > * {
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
