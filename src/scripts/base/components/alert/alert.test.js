import { mount } from 'vue-test-utils';
import alert from './alert'

describe('Alert', () => {
  let propsDataMock;

  function mockPropsData(){
    propsDataMock = {
      alert: {
        message: 'some message!',
        retryAction: jasmine.createSpy()
      },
      theme: 'error'
    };
  }

  beforeEach(() => {
    mockPropsData();
  });

  it('should render some themed alert', () => {
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    expect(wrapper.classes().length).toEqual(2);
    expect(wrapper.classes()[0]).toEqual('alert');
    expect(wrapper.classes()[1]).toEqual('alert-error');
  });

  it('should show some alert message', () => {
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    expect(wrapper.find('span').text()).toEqual('some message!');
  });

  it('should render retry button if retry custom action was passed', () => {
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    expect(wrapper.contains('button')).toBe(true);
  });

  it('should call retry custom action if it was passed', () => {
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    wrapper.find('button').trigger('click');
    expect(propsDataMock.alert.retryAction).toHaveBeenCalled();
  });

  it('should not render retry button if no retry custom action was passed', () => {
    delete propsDataMock.alert.retryAction;
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    expect(wrapper.contains('button')).toBe(false);
  });

  it('should remove alert id alert object is destroyed', () => {
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    wrapper.vm.alert = null;
    wrapper.update();
    expect(wrapper.contains('.alert')).toBe(false);
  });
});
