import dateService from '@scripts/base/services/date';
import weatherResource from '@scripts/weather/resource';
import weatherStorageService from '@scripts/weather/services/storage';

const _public = {};

const CACHE_TTL = 540000;

_public.get = (city, countryCode) => {
  return new Promise((resolve, reject) => {
    const weather = weatherStorageService.get(city, countryCode);
    if(weather && !isStoredWeatherExpired(weather))
      resolve(weather);
    else
      weatherResource.get(city, countryCode).then(response => {
        resolve(onGetWeatherSuccess(response, city, countryCode));
      }, err => {
        reject(err);
      });
  });
};

function onGetWeatherSuccess(response, city, countryCode){
  const weather = parseWeatherResponse(response);
  weatherStorageService.set(city, countryCode, weather);
  return weather;
};

function parseWeatherResponse(response){
  const date = dateService.getNow();
  return {
    temperature: parseInt(response.data.main.temp),
    humidity: response.data.main.humidity,
    pressure: response.data.main.pressure,
    updatedAt: {
      time: date.getTime(),
      timeString: dateService.format(date, 'hh:mm:ss A')
    }
  };
}

function isStoredWeatherExpired(weather){
  const now = dateService.getNow().getTime();
  return (now - weather.updatedAt.time) > CACHE_TTL;
}

export default _public;
