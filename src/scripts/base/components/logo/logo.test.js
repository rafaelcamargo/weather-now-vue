import { mount } from 'vue-test-utils';
import logo from './logo';

describe('Logo', () => {
  it('should emit some click interaction', () => {
    const wrapper = mount(logo);
    wrapper.find('.logo').trigger('click');
    expect(wrapper.emitted().click).toBeTruthy()
  });
});
