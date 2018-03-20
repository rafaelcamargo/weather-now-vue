import ENV from '@environment';
import analyticsService from './analytics';
import dateService from '@scripts/base/services/date';

describe('Analytics Service', () => {
  const dateMock = new Date();
  const locationHashMock = '#/products';
  const createElementMock = {
    setAttribute: jasmine.createSpy()
  };

  beforeEach(() => {
    spyOn(document, 'createElement').and.returnValue({
      setAttribute: createElementMock.setAttribute
    });
    spyOn(document.head, 'appendChild');
    spyOn(dateService, 'getNow').and.returnValue(dateMock)
  });

  afterEach(() => {
    delete window.dataLayer;
    window.location.hash = '';
  })

  it('should get analytics thirdy party code asynchronously', () => {
    analyticsService.init();
    expect(createElementMock.setAttribute).toHaveBeenCalledWith('async', 'true');
  });

  it('should get analytics thirdy party code passing analytics id', () => {
    analyticsService.init();
    expect(createElementMock.setAttribute).toHaveBeenCalledWith(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${ENV.GOOGLE_ANALYTICS.ID}`
    );
  });

  it('should append script tag to get analytics thirdy party code on head', () => {
    analyticsService.init();
    expect(document.head.appendChild).toHaveBeenCalledWith(jasmine.any(Object));
  });

  it('should configure analytics settings after append script tag on head', () => {
    window.location.hash = locationHashMock;
    analyticsService.init();
    expect(window.dataLayer[0][0]).toEqual('js');
    expect(window.dataLayer[0][1]).toEqual(dateMock);
    expect(window.dataLayer[1][0]).toEqual('config');
    expect(window.dataLayer[1][1]).toEqual(ENV.GOOGLE_ANALYTICS.ID);
    expect(window.dataLayer[1][2]).toEqual({page_path: '/products'});
  });

  it('should track page view', () => {
    const path = '/products/twitter/people';
    analyticsService.trackPageView(path);
    expect(window.dataLayer[0][0]).toEqual('config');
    expect(window.dataLayer[0][1]).toEqual(ENV.GOOGLE_ANALYTICS.ID);
    expect(window.dataLayer[0][2]).toEqual({page_path: path});
  });
});
