import ENV from '@environment';

const ANALYTICS_BASE_URL = 'https://www.googletagmanager.com/gtag/js';
const ANALYTICS_ID = ENV.GOOGLE_ANALYTICS.ID;
const _public = {};

_public.init = () => {
  buildAnalyticsScriptTag(ANALYTICS_ID);
  configAnalytics(ANALYTICS_ID);
};

_public.trackPageView = path => {
  configAnalytics(ANALYTICS_ID, path);
};

function buildAnalyticsScriptTag(id){
  const tag = document.createElement('script');
  tag.setAttribute('async', 'true');
  tag.setAttribute('src', `${ANALYTICS_BASE_URL}?id=${id}`);
  document.head.appendChild(tag);
}

function configAnalytics(id, path){
  if(!path)
    gtag('js', new Date());
  gtag('config', id, {page_path: (path || getLocationPath())});
}

function getLocationPath(){
  return window.location.hash.replace('#/','/');
}

function gtag(){
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

export default _public;
