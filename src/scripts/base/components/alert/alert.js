import '@styles/base/alert.styl';
import template from './alert.html';

export default {
  name: 'alert',
  props: ['alert', 'theme'],
  data(){
    return {}
  },
  methods: {
    retry(){
      this.alert.retryAction()
    }
  },
  computed: {
    classes() {
      return {
        'alert-error': this.theme === 'error'
      };
    },
  },
  template
};
