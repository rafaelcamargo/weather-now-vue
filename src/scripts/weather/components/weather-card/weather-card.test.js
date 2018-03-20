import { mount } from 'vue-test-utils';
import weatherService from '@scripts/weather/services/weather';
import weatherCard from './weather-card';

describe('Weather Card', () => {
  let wrapper,
    weatherMock,
    propsDataMock;

  function mockWeather(){
    weatherMock = {
      temperature: 23
    };
  }

  function mockPropsData(){
    propsDataMock = {
      city: 'joinville',
      countryCode: 'br'
    };
  };

  beforeEach(() => {
    spyOn(weatherService, 'get');
    mockPropsData();
    mockWeather();
    wrapper = mount(weatherCard, {propsData: propsDataMock});
  });

  it('should config title on initialize', () => {
    expect(wrapper.vm.title).toEqual('Joinville, BR');
  });

  it('should fetch', () => {
    wrapper.vm.fetch();
    expect(weatherService.get).toHaveBeenCalledWith('joinville', 'br');
  });

  it('should set data on fetch success', () => {
    wrapper.vm.fetchSuccess(weatherMock);
    expect(wrapper.vm.weather).toEqual(weatherMock);
  });

  it('should config temperature css class as cold when it\'s below 5 degrees', () => {
    weatherMock.temperature = -4;
    wrapper.vm.fetchSuccess(weatherMock);
    expect(wrapper.vm.temperatureCssClass).toEqual('weather-card-temperature-cold');
  });

  it('should config temperature css class as hot when it\'s above 25 degrees', () => {
    weatherMock.temperature = 34;
    wrapper.vm.fetchSuccess(weatherMock);
    expect(wrapper.vm.temperatureCssClass).toEqual('weather-card-temperature-hot');
  });

  it('should config temperature css class as pleasent when it\'s between 5 and 25 degrees', () => {
    wrapper.vm.fetchSuccess(weatherMock);
    expect(wrapper.vm.temperatureCssClass).toEqual('weather-card-temperature-pleasant');
  });
});