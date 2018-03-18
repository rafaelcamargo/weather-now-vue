import baseStorageService from '@scripts/base/services/storage';

const _public = {};
const STORAGE_KEY = 'weathers';

_public.set = (city, countryCode, value) => {
  const cityKey = getCityKey(city, countryCode);
  const weathers = retrieveWeathers();
  weathers[cityKey] = value;
  storeWeathers(weathers);
};

_public.get = (city, countryCode) => {
  const cityKey = getCityKey(city, countryCode);
  const weathers = retrieveWeathers();
  return weathers[cityKey];
};

_public.remove = (city, countryCode) => {
  const cityKey = getCityKey(city, countryCode);
  const weathers = retrieveWeathers();
  delete weathers[cityKey];
  storeWeathers(weathers);
};

const getCityKey = (city, countryCode) => {
  return `${city.replace(' ', '+')}-${countryCode}`;
};

const storeWeathers = weathers => {
  baseStorageService.set(STORAGE_KEY, JSON.stringify(weathers));
};

const retrieveWeathers = () => {
  const weathers = baseStorageService.get(STORAGE_KEY);
  return weathers ? JSON.parse(weathers) : {};
};

export default _public;
