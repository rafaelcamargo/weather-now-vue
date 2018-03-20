import alert from '@scripts/base/components/alert/alert';
import loader from '@scripts/base/components/loader/loader';
import template from './card.html';

export default {
  name: 'card',
  components: {
    alert,
    loader
  },
  props: [
    'alert',
    'fetch',
    'fetchSuccess',
    'refresh',
    'refreshInterval',
    'title'
  ],
  data(){
    return {
      shouldShowLoader: null,
      shouldShowContent: null,
      interval: null
    }
  },
  mounted(){
    if(this.fetch)
      this.fetchData();
    if(this.refresh)
      this.setRefreshInterval(this.refreshInterval);
  },
  beforeDestroy(){
    this.clearRefreshInterval();
  },
  methods: {
    fetchData(){
      this.clearAlert();
      this.setLoaderVisibility(true);
      this.setContentVisibility(false);
      this.fetch().then(this.onFetchDataSuccess, this.onFetchDataError);
    },
    onFetchDataSuccess(response){
      this.fetchSuccess(response);
      this.onFetchDataComplete();
    },
    onFetchDataError(){
      this.setAlert('error', 'Something went wrong', this.fetchData);
      this.onFetchDataComplete();
    },
    onFetchDataComplete(){
      this.setLoaderVisibility(false);
      this.configContentVisibility();
    },
    configContentVisibility(){
      const shouldShow = !this.shouldShowLoader && !this.alert;
      this.setContentVisibility(shouldShow);
    },
    setContentVisibility(shouldShow){
      this.shouldShowContent = shouldShow;
    },
    setAlert(theme, message, retryAction){
      this.alert = {theme, message, retryAction};
    },
    clearAlert(){
      this.alert = null;
    },
    setLoaderVisibility(shouldShowLoader){
      this.shouldShowLoader = shouldShowLoader;
    },
    setRefreshInterval(interval){
      this.interval = window.setInterval(this.fetchData, interval);
    },
    clearRefreshInterval(){
      window.clearInterval(this.interval);
    }
  },
  template
};
