import baseStorageService from '@scripts/base/services/storage'
import weatherStorageService from './storage'

describe('Weather Storage Service', () => {
  let weathersMock;

  function mockWeathers(){
    weathersMock = {
      'nairobi-ke': {temp: 34},
      'nuuk-gl': {temp: -4}
    };
  }

  function stubStorageServiceGet(storage){
    spyOn(baseStorageService, 'get').and.returnValue(storage);
  };

  beforeEach(() => {
    spyOn(baseStorageService, 'set');
    mockWeathers();
  });

  it('should store some weather', () => {
    stubStorageServiceGet();
    const weather = {temp: 25};
    weatherStorageService.set('joinville', 'br', weather);
    expect(baseStorageService.set).toHaveBeenCalledWith('weathers', JSON.stringify({
      'joinville-br': weather
    }));
  });

  it('should retrieve some weather', () => {
    stubStorageServiceGet(JSON.stringify(weathersMock));
    expect(weatherStorageService.get('nuuk', 'gl')).toEqual(weathersMock['nuuk-gl']);
  });

  it('should remove some weather', () => {
    stubStorageServiceGet(JSON.stringify(weathersMock));
    weatherStorageService.remove('nuuk', 'gl');
    expect(baseStorageService.set).toHaveBeenCalledWith('weathers', JSON.stringify({
      'nairobi-ke': {temp: 34}
    }));
  });
});
