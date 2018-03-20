import Vue from '@vue';
import card from './card';

describe('Card', () => {
  let propsDataMock;

  function mockPropsData(){
    propsDataMock = {
      title: 'Custom Card',
      fetch: jasmine.createSpy(),
      fetchSuccess: jasmine.createSpy()
    };
  }

  function stubFetchAction(vm, responseType, response, shouldAbortRequest){
    vm.fetch.and.returnValue({
      then: (successCallback, errorCallback) => {
        if(responseType == 'success' && !shouldAbortRequest)
          successCallback(response);
        else if(!shouldAbortRequest)
          errorCallback(response);
      }
    })
  }

  function createComponent(propsData = propsDataMock){
    const Ctor = Vue.extend(card);
    return new Ctor({ propsData });
  }

  beforeEach(() => {
    mockPropsData();
  });

  it('should not fetch data if no fetch action is given', () => {
    delete propsDataMock.fetch;
    const vm = createComponent(propsDataMock);
    spyOn(vm, 'fetchData');
    vm.$mount();
    expect(vm.fetchData).not.toHaveBeenCalled();
  });

  it('should fetch data if fetch action is given', () => {
    const vm = createComponent();
    stubFetchAction(vm, 'success');
    vm.$mount();
    expect(vm.fetch).toHaveBeenCalled();
  });

  it('should clear alert on fetch data', () => {
    const vm = createComponent();
    stubFetchAction(vm, 'success');
    spyOn(vm, '$emit');
    vm.$mount();
    expect(vm.$emit).toHaveBeenCalledWith('update:alert', null)
  });

  it('should show loader on fetch data', () => {
    const vm = createComponent();
    stubFetchAction(vm, 'success', {}, true);
    vm.$mount();
    expect(vm.shouldShowLoader).toEqual(true);
  });

  it('should hide loader on fetch data complete', () => {
    const vm = createComponent();
    stubFetchAction(vm, 'success');
    vm.$mount();
    expect(vm.shouldShowLoader).toEqual(false);
  });

  it('should call fetch success action on fetch data success', () => {
    const response = {some: 'response'};
    const vm = createComponent();
    stubFetchAction(vm, 'success', response);
    vm.$mount();
    expect(vm.fetchSuccess).toHaveBeenCalledWith(response);
  });

  it('should show alert error on fetch data error', () => {
    const vm = createComponent();
    stubFetchAction(vm, 'error');
    spyOn(vm, '$emit');
    vm.$mount();
    expect(vm.$emit).toHaveBeenCalledWith('update:alert', {
      theme: 'error',
      message: 'Something went wrong',
      retryAction: vm.fetchData
    });
  });

  it('should have the ability to refresh data after custom interval', () => {
    propsDataMock.refresh = true;
    propsDataMock.refreshInterval = 60000;
    const vm = createComponent();
    stubFetchAction(vm, 'success');
    spyOn(window, 'setInterval');
    vm.$mount();
    expect(window.setInterval).toHaveBeenCalledWith(vm.fetchData, 60000);
  });

  it('should clear interval before destroying component', () => {
    const vm = createComponent();
    spyOn(window, 'clearInterval');
    vm.interval = 123;
    vm.$destroy();
    expect(window.clearInterval).toHaveBeenCalledWith(vm.interval);
  });
});
