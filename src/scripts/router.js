import Vue from '@vue';
import VueRouter from 'vue-router';
import weather from '@scripts/weather/views/weather.js';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      redirect: '/weather'
    },
    {
      name: 'weather',
      path: '/weather',
      component: weather
    }
  ]
});

export default router;
