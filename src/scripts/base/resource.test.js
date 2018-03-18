import ENV from '@environment';
import axios from 'axios';
import baseResource from './resource';

describe('Base Resource', () => {

  beforeEach(() => {
    spyOn(axios, 'get');
  });

  it('should be able to do a get request', () => {
    const uri = 'some/uri';
    baseResource.get(uri);
    expect(axios.get).toHaveBeenCalledWith(`${ENV.BASE_API_URL}/${uri}`, undefined);
  });

  it('should be able to do a get request passing query params', () => {
    const uri = 'some/uri';
    const params = {some: 'param', other: 'param'};
    baseResource.get(uri, params);
    expect(axios.get).toHaveBeenCalledWith(`${ENV.BASE_API_URL}/${uri}`, {
      params
    });
  });
});
