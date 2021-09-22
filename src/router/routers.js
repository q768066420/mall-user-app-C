import Home from '../views/Home/index.vue';
import Search from '../views/Search/index.vue';
import Shopping from '../views/Home/Shopping/index.vue';
import Classify from '../views/Home/Classify/index.vue';

export default [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: 'shopping',
      name: 'Shopping',
      component: Shopping,
    },
    {
      path: 'classify',
      name: 'Classify',
      component: Classify,
    }],
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '*',
    redirect: '/home/classify',
  },
];
