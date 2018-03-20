import { shallow } from 'vue-test-utils';
import weatherCard from '@scripts/weather/components/weather-card/weather-card';
import weatherCardPanel from './weather-card-panel';

describe('Weather Card Panel', () => {
  it('should render three weather cards', () => {
    const wrapper = shallow(weatherCardPanel);
    expect(wrapper.findAll(weatherCard).length).toEqual(3);
  });
});
