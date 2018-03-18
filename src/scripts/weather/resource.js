import ENV from '@environment';
import baseResource from '@scripts/base/resource'

const _public = {};
const BASE_URL = ENV.OPEN_WEATHER_MAP.API_URL;

_public.get = (city, countryCode) => {
  const query = buildBaseQueryParams();
  query.q = buildCityQueryParam(city, countryCode);
  return baseResource.get(`${BASE_URL}/weather`, query);
};

function buildBaseQueryParams(){
  return {
    appid: ENV.OPEN_WEATHER_MAP.API_KEY,
    units: 'metric'
  };
}

function buildCityQueryParam(city, countryCode){
  return `${city},${countryCode}`.toLowerCase();
}

export default _public;
