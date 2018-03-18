import storageService from './storage';

describe('Storage Service', () => {
  function mockLocalStorage(){
    global.localStorage = {
      getItem: jasmine.createSpy(),
      setItem: jasmine.createSpy(),
      removeItem: jasmine.createSpy()
    };
  }

  beforeAll(() => {
    mockLocalStorage();
  });

  afterAll(() => {
    delete global.localStorage;
  });

  it('should get item from local storage', () => {
    const key = 'name';
    storageService.get(key);
    expect(global.localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should set item on local storage', () => {
    const key = 'name';
    const value = 'rafael'
    storageService.set(key, value);
    expect(global.localStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it('should remove item from local storage', () => {
    const key = 'name';
    storageService.remove(key);
    expect(global.localStorage.removeItem).toHaveBeenCalledWith(key);
  });
});
