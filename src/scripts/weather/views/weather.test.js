import { shallow } from 'vue-test-utils';
import viewport from '@scripts/base/components/viewport/viewport';
import weatherCardPanel from '@scripts/weather/components/weather-card-panel/weather-card-panel';
import weather from './weather';

describe('Weather View', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(weather);
  });

  it('should render a viewport', () => {
    expect(wrapper.findAll(viewport).length).toEqual(1);
  });
});
