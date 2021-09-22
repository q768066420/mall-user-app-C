<template>
  <!-- 搜索头部 -->
  <div class="search-container">
    <div class="serch-header">
      <van-icon name="arrow-left" class="arr-left" @click="$router.back()" />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
      >
        <template #action v-if="showList">
          <div @click="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <router-link
            tag="div"
            class="shop-car"
            id="shop-car"
            to="/home/shopping"
          >
            <van-icon name="shopping-cart-o" :badge="badge" />
          </router-link>
        </template>
      </van-search>
    </div>
    <!-- 模糊搜索列表 -->
    <div class="like-search" v-if="showList && !isInput">
      <van-list>
        <van-cell
          v-for="item in likeSearchList"
          :key="item"
          :title="item"
          @click="onSearch(item)"
        >
          <template #title>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <!-- 搜索结果列表 -->
    <div class="goods-card" v-if="!showList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Card
          v-for="(item, i) in list"
          :key="i"
          :opaction="item"
          :id="item.id"
          :num="contentMap[item.id] || 0"
        ></Card>
      </van-list>
    </div>
    <!-- 历史搜索记录 -->
    <div class="history" v-if="showList && isInput">
      <h3>历史记录:</h3>
      <SideBarHistory :historyList="this.historyList" @historyS="onSearch" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getLikeSearch, getSearch } from '@/api';
import Card from '@/components/Car.vue';
import SideBarHistory from '@/components/SideBarHistory.vue';

export default {
  created() {
    this.historyList = JSON.parse(window.localStorage.getItem('history')) || [];
  },
  components: {
    Card,
    SideBarHistory,
  },
  computed: {
    ...mapState({
      contentMap: (state) => state.contentMap,
    }),
    badge() {
      const l = Object.values(this.contentMap).reduce(
        (prev, next) => prev + next,
        0,
      );
      if (l > 99) {
        return '99+';
      }
      return l;
    },
  },
  data() {
    return {
      value: this.place,
      place: '酒',
      timer: null,
      likeSearchList: [],
      showList: true,
      finished: false,
      loading: false,
      list: [],
      page: 1,
      size: 5,
      length: 0,
      isInput: true,
      historyList: [],
    };
  },
  methods: {
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const res = await getSearch(this.value, this.page, this.size);
      this.loading = false;
      this.list = [...this.list, ...res.list];
      this.length = res.total;
      if (this.length <= this.list.length) {
        this.finished = true;
      }
    },
    formatHTML(value) {
      const val = new RegExp(this.value, 'g');
      return value.replace(val, this.value.fontcolor('red'));
    },
    async onSearch(value) {
      if (value) {
        this.value = value;
      }
      this.finished = false;
      this.loading = false;
      this.likeSearchList = [];
      if (this.value === '') {
        this.value = this.place;
      }
      this.showList = false;
      this.page = 1;
      const res = await getSearch(this.value, this.page, this.size);
      this.list = res.list;

      const historyL = this.historyList.find((item) => item.value === this.value);
      if (historyL) {
        historyL.time = new Date().getTime();
        this.historyList.sort((a, b) => b.time - a.time);
      } else {
        this.historyList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.historyList.length >= 11) {
          this.historyList.pop();
        }
      }
      localStorage.setItem('history', JSON.stringify(this.historyList));
    },
    onCancel() {},
    onInput(value) {
      if (value === '') {
        this.likeSearchList = [];
        this.showList = true;
        this.isInput = true;
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const res = await getLikeSearch(this.value);
          this.likeSearchList = res.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
      this.isInput = false;
    },
  },
};
</script>

<style scoped lang = 'less'>
.search-container {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .serch-header {
    width: 345px;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 100;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 25px;
      }
    }
    .like-search {
      top: 50px;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding-left: 30px;
      background: #fff;
      z-index: 10;
    }
  }
  .goods-card {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
  .history {
    width: 350px;
    position: absolute;
    top: 48px;
    left: 10px;
    z-index: 1;
  }
}
</style>
