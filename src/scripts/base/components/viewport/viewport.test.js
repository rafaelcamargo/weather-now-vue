import { mount } from 'vue-test-utils';
import viewport from './viewport';

describe('Viewport', () => {
  it('should render default slot', () => {
    const wrapper = mount(viewport, {
      slots: {
        default: '<p>hello!</p>'
      }
    });
    expect(wrapper.find('p').text()).toEqual('hello!');
  });
});
