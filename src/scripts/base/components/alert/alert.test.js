import { mount } from 'vue-test-utils';
import alert from './alert'

fdescribe('Alert', () => {
  let propsDataMock;

  function mockPropsData(){
    propsDataMock = {
      alert: {
        theme: 'error',
        message: 'some message!',
        retryAction: jasmine.createSpy()
      }
    };
  }

  beforeEach(() => {
    mockPropsData();
  });

  it('should render some theme', () => {
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    expect(wrapper.vm.themeCssClass).toEqual('alert-error');
  });

  it('should show some message', () => {
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    expect(wrapper.find('.alert-message').text()).toEqual('some message!');
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

  it('should remove alert if alert object is destroyed', () => {
    const wrapper = mount(alert, {
      propsData: propsDataMock
    });
    wrapper.vm.alert = null;
    wrapper.update();
    expect(wrapper.contains('.alert')).toBe(false);
  });
});
