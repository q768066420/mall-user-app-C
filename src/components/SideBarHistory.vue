<template>
  <div class="sideBarHistory">
    <div
      class="his-item"
      v-for="item in historyList"
      :key="item.time"
      @click="search(item.value)"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['historyList'],
  methods: {
    search(value) {
      this.$emit('historyS', value);
    },
  },
};
</script>

<style lang='less' >
.his-item {
  padding: 15px;
  background: #eee;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
</style>
