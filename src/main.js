import Vue from 'vue';
import Vant, { Toast, Dialog } from 'vant';
import 'vant/lib/index.css';

import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';

Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Toast = Toast;
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
