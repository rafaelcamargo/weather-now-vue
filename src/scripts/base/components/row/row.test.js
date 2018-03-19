import { mount } from 'vue-test-utils';
import row from './row'

describe('Row', () => {
  it('should render default slot', () => {
    const wrapper = mount(row, {
      slots: {
        default: '<p>hello!</p>'
      }
    });
    expect(wrapper.contains('p')).toBe(true);
    expect(wrapper.find('p').text()).toEqual('hello!');
  });
});
