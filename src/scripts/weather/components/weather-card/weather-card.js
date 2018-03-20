import '@styles/weather/weather-card.styl';
import weatherService from '@scripts/weather/services/weather';
import card from '@scripts/base/components/card/card';
import row from '@scripts/base/components/row/row';
import rowItem from '@scripts/base/components/row-item/row-item';
import template from './weather-card.html';

export default {
  name: 'weather-card',
  components: {
    card,
    row,
    rowItem
  },
  props: [
    'city',
    'countryCode',
    'showHumidity',
    'showPressure'
  ],
  data(){
    return {
      alert: null,
      title: null,
      weather: null,
      temperatureCssClass: null
    }
  },
  mounted(){
    this.configTitle();
  },
  methods: {
    fetch(){
      return weatherService.get(this.city, this.countryCode);
    },
    fetchSuccess(weather){
      this.setWeather(weather);
      this.configTemperatureCssClass(weather.temperature);
    },
    configTitle(){
      const title = this.getTitle();
      this.setTitle(title);
    },
    getTitle(){
      return `${this.formatCityName(this.city)}, ${this.formatCountryCode(this.countryCode)}`
    },
    formatCityName(cityName){
      return `${cityName[0].toUpperCase()}${cityName.substring(1)}`;
    },
    formatCountryCode(countryCode){
      return countryCode.toUpperCase();
    },
    setTitle(title){
      this.title = title;
    },
    setWeather(weather){
      this.weather = weather;
    },
    configTemperatureCssClass(temperature){
      const cssClass = this.getTemperatureCssClass(temperature);
      this.setTemperatureCssClass(cssClass);
    },
    getTemperatureCssClass(temperature){
      if(temperature < 5)
        return 'weather-card-temperature-cold';
      if(temperature > 25)
        return 'weather-card-temperature-hot';
      return 'weather-card-temperature-pleasant';
    },
    setTemperatureCssClass(cssClass){
      this.temperatureCssClass = cssClass;
    }
  },
  template
};
