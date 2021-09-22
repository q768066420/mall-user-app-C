<template>
  <div class="app-container" id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setContentMap', counterMap);
  },
};
</script>
<style lang="less">
.app-container{
 width: 350px;
}
</style>
