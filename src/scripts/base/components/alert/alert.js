import '@styles/base/alert.styl';
import template from './alert.html';

export default {
  name: 'alert',
  props: ['alert'],
  data(){
    return {
      themeCssClass: null
    };
  },
  mounted(){
    this.configTheme();
  },
  updated(){
    this.configTheme();
  },
  methods: {
    configTheme(){
      const cssClass = this.getTheme();
      this.setThemeCssClass(cssClass);
    },
    getTheme(){
      return this.isThemeValid(this.alert) ? `alert-${this.alert.theme}` : '';
    },
    setThemeCssClass(cssClass){
      this.themeCssClass = cssClass;
    },
    isThemeValid(alert){
      return alert && ['error'].includes(alert.theme);
    },
    retry(){
      this.alert.retryAction()
    }
  },
  template
};
