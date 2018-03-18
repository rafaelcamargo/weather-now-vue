import ENV from '@environment';
import baseResource from '@scripts/base/resource';
import weatherResource from './resource';

describe('Weather Resource', () => {

  beforeEach(() => {
    spyOn(baseResource, 'get');
  });

  it('should get city weather', () => {
    const city = 'Joinville';
    const countryCode = 'BR';
    weatherResource.get(city, countryCode);
    expect(baseResource.get).toHaveBeenCalledWith(`${ENV.OPEN_WEATHER_MAP.API_URL}/weather`, {
      q: 'joinville,br',
      appid: ENV.OPEN_WEATHER_MAP.API_KEY,
      units: 'metric'
    });
  });
});
