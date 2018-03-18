import dateService from './date';

describe('Date Service', () => {
  const dateMock = new Date();

  it('should get now date', () => {
    spyOn(window, 'Date').and.returnValue(dateMock);
    expect(dateService.getNow()).toEqual(dateMock);
  });

  it('should format some date', () => {
    const date = new Date(2018, 2, 14);
    expect(dateService.format(date, 'DD/MM/YYYY')).toEqual('14/03/2018');
  });
});
