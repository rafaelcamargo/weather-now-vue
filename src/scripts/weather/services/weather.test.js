import dateService from '@scripts/base/services/date';
import weatherResource from '@scripts/weather/resource';
import weatherStorageService from '@scripts/weather/services/storage';
import weatherService from './weather';

describe('Weather Service', () => {
  let storedWeatherMock,
    weatherMock;

  const updatedAtMock = new Date(2018, 2, 14, 0, 5);

  function mockStoredWeather(){
    storedWeatherMock = {
      temperature: 23,
      humidity: 85,
      pressure: 1046,
      updatedAt: {
        time: updatedAtMock.getTime(),
        string: '12:00:00 AM'
      }
    };
  }

  function mockWeather(){
    weatherMock = {
      main: {
        temp: 23,
        humidity: 85,
        pressure: 1046
      }
    };
  }

  function stubWeatherStorageServiceGet(weather){
    spyOn(weatherStorageService, 'get').and.returnValue(weather);
  }

  function stubWeatherResourceGet(responseType, response = weatherMock){
    spyOn(weatherResource, 'get').and.returnValue({
      then: (successCallback, errorCallback) => {
        if(responseType == 'success')
          successCallback(response);
        else
          errorCallback(response);
      }
    });
  }

  beforeEach(() => {
    spyOn(weatherStorageService, 'set');
    spyOn(dateService, 'getNow').and.returnValue(new Date(2018, 2, 14, 0, 10));
    mockStoredWeather();
    mockWeather();
  });

  it('should get return a promise', () => {
    stubWeatherStorageServiceGet(null);
    const promise = weatherService.get('joinville', 'br').then(() => {}, () => {});
    expect(promise.then).toBeDefined();
  });

  it('should get weather from resource if there is no cache', () => {
    stubWeatherStorageServiceGet(null);
    stubWeatherResourceGet('success');
    weatherService.get('joinville', 'br').then(() => {}, () => {});;
    expect(weatherResource.get).toHaveBeenCalledWith('joinville', 'br');
  });

  it('should get weather from resource if cache is expired', () => {
    storedWeatherMock.updatedAt.time = new Date(2018, 2, 13, 23, 59);
    stubWeatherStorageServiceGet(storedWeatherMock);
    stubWeatherResourceGet('success');
    weatherService.get('joinville', 'br').then(() => {}, () => {});;
    expect(weatherResource.get).toHaveBeenCalled();
  });

  it('should cache weather on get success', () => {
    stubWeatherStorageServiceGet(null);
    stubWeatherResourceGet('success');
    weatherService.get('joinville', 'br').then(() => {}, () => {});;
    expect(weatherStorageService.set).toHaveBeenCalledWith('joinville', 'br', {
      temperature: 23,
      humidity: 85,
      pressure: 1046,
      updatedAt: {
        time: new Date(2018, 2, 14, 0, 10).getTime(),
        string: '12:10:00 AM'
      }
    });
  });

  it('should not get weather from resource if cache is not expired', () => {
    storedWeatherMock.updatedAt.time = new Date(2018, 2, 14, 0, 1, 1);
    stubWeatherStorageServiceGet(storedWeatherMock);
    stubWeatherResourceGet('success');
    weatherService.get('joinville', 'br').then(() => {}, () => {});;
    expect(weatherResource.get).not.toHaveBeenCalled();
  });

  it('should reject promise on get error', () => {
    const errorMock = new Error('rejected!');
    stubWeatherStorageServiceGet(null);
    stubWeatherResourceGet('error', errorMock);
    weatherService.get('joinville', 'br').then(() => {}, err => {
      expect(err).toEqual(errorMock);
    });
  });
});
