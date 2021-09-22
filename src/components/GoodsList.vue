<template>
  <div class="goods-list-container">
    <div class="list-header">
      <div :class="{ active: sort === 'all' }" @touchend="changeType('all')">
        综合
      </div>
      <div :class="{ active: sort === 'sale' }" @touchend="changeType('sale')">
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': sort === 'price-up',
          'price-down': sort === 'price-down',
        }"
        @touchend="changeType('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="Loading" @refresh="onRefresh" head-height="80">
        <van-list
          v-model="Load"
          :finished="finished"
          @load="onLoad"
          finished-text="没有更多了"
          :immediate-check="false"
        >
          <Car
            v-for="(item, i) in goodsList"
            :key="i"
            :opaction="item"
            :id="item.id"
            :num="contentMap[item.id] || 0"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Car from '@/components/Car.vue';

export default {
  computed: {
    ...mapState(['goodsList', 'isTotal', 'sort', 'contentMap']),
  },
  data() {
    return {
      Loading: false,
      finished: false,
      Load: false,
      page: 1,
    };
  },
  components: {
    Car,
  },
  methods: {
    onRefresh() {
      this.Loading = true;
      this.Load = false;
      this.finished = false;
      this.page = 1;
      this.$store.dispatch('acRequestGoodList');
      this.$store.dispatch('acGetGoodsList', { page: 1, size: 5 });
      this.Loading = false;
    },
    onLoad() {
      this.page += 1;
      this.$store.dispatch('acGetGoodsList', {
        page: this.page,
        size: 5,
      });
      this.Load = false;
      if (this.isTotal) {
        this.finished = true;
      } else {
        this.finished = false;
      }
    },
    changeType(sort) {
      if (sort === 'all') {
        this.$store.commit('setSort', 'all');
      } else if (sort === 'sale') {
        this.$store.commit('setSort', 'sale');
      } else if (sort === 'price') {
        if (this.sort === 'price-up') {
          this.$store.commit('setSort', 'price-down');
        } else {
          this.$store.commit('setSort', 'price-up');
        }
      }
      this.onRefresh();
    },
  },
};
</script>

<style scoped lang='less'>
.goods-list-container {
  transform: translateY(0);
  transition: all 0.3s;
  position: fixed;
  border-top: 1px solid #eee;
  top: 135px;
  right: 0;
  width: 296px;
  bottom: 50px;
  overflow: auto;
  .list-header {
    position: sticky;
    top: 0;
    height: 25px;
    width: 280px;
    padding: 0 8px;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
    display: flex;
    font-size: 12px;
    justify-content: flex-end;
    z-index: 100;
    background: #fff;
    > div {
      height: 25px;
      line-height: 25px;
      width: 50px;
      text-align: center;
      color: #aaa;
      position: relative;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price::after {
      content: "";
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      bottom: 4px;
      right: 0;
    }
    .price::before {
      content: "";
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      top: 4px;
      right: 0;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .price-down::after {
      border-top-color: #ff1a90;
    }
  }
  .list-content {
    position: relative;
    transition: translateY 0.3s linear;
    .list-item {
      background: red;
      border-bottom: 1px solid white;
    }
  }
}
.list::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.card {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  .card-img {
    width: 90px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    > div {
      width: 190px;
      font-size: 12px;
    }
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: 400;
    }
    .desc {
      color: #aaa;
      margin-bottom: 3px;
    }
    .tags {
      display: flex;
      margin-bottom: 3px;
      > div {
        border: 1px solid #aaa;
        padding: 1px;
        color: #aaa;
        border-radius: 3px;
      }
    }
    .prices {
      display: flex;
      align-items: center;
      .price-off {
        font-size: 14px;
        color: pink;
        font-weight: 600;
        margin-right: 5px;
      }
      .price {
        font-size: 12px;
        color: #aaa;
        text-decoration: line-through;
      }
    }
  }
  .counter {
    display: flex;
    position: absolute;
    bottom: 5px;
    right: 15px;
    justify-content: flex-end;
    > div:not(.num) {
      font-size: 22px;
      width: 22px;
      height: 22px;
      line-height: 19px;
      border-radius: 11px;
      color: white;
      font-weight: 700;
      background: lime;
      text-align: center;
    }
    .num {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
}
.van-pull-refresh {
  overflow: unset;
}

.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
