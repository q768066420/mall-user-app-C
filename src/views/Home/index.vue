<template>
  <div class="home-container">
    <router-view />
    <TabBar />
  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';

export default {
  components: {
    TabBar,
  },
};
</script>

<style>
</style>
