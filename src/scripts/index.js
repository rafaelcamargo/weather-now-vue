import '@styles/_variables.styl';
import '@styles/_mixins.styl';
import '@styles/_native.styl';
import ENV from '@environment';
import Vue from '@vue';
import router from './router';

const app = new Vue({
  router
}).$mount('[data-app]');
