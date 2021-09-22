import Vue from 'vue';
import Vuex from 'vuex';
import { getSidebar, getGoodsList } from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarList: [],
    isLoading: false,
    goodsList: [],
    type: 2,
    isTotal: false,
    sort: 'all',
    contentMap: {},
  },
  mutations: {
    setContentMap(state, params) {
      state.contentMap = params;
    },
    setSiderBar(state, params) {
      state.sidebarList = params;
      state.isLoading = true;
    },
    setGoodsList(state, params) {
      state.goodsList = [
        ...state.goodsList,
        ...params,
      ];
    },
    requestGoodList(state) {
      state.goodsList = [];
    },
    setType(state, params) {
      state.type = params;
    },
    setIsTotal(state, params) {
      state.isTotal = params;
    },
    setSort(state, params) {
      state.sort = params;
    },
    requestContentMap(state, { id, num }) {
      if (state.contentMap[id]) {
        if (num <= 0 && num === 1) {
          Vue.delete(state.contentMap, id);
        } else {
          Vue.set(state.contentMap, id, state.contentMap[id] + num);
        }
      } else {
        Vue.set(state.contentMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.contentMap));
    },
  },
  actions: {
    async acSetSidebar(ctx, params) {
      const value = await getSidebar(params);
      ctx.commit('setSiderBar', value);
    },
    async acGetGoodsList(ctx, params) {
      const { page, size } = params;
      const type = params.type || ctx.state.type;
      const sortType = ctx.state.sort;
      const { list, total } = await getGoodsList(type, page, size, sortType);
      ctx.commit('setGoodsList', list);
      ctx.commit('setType', type);
      if (ctx.state.goodsList.length >= total) {
        ctx.commit('setIsTotal', true);
      } else {
        ctx.commit('setIsTotal', false);
      }
    },
    async acRequestGoodList(ctx) {
      ctx.commit('requestGoodList');
    },
  },
  modules: {
  },
});
