import '@styles/_variables.styl';
import '@styles/_mixins.styl';
import '@styles/_native.styl';
import ENV from '@environment';
import Vue from '@vue';
import router from './router';
import analyticsService from '@scripts/base/services/analytics';

const app = new Vue({
  router
}).$mount('[data-app]');

analyticsService.init();
