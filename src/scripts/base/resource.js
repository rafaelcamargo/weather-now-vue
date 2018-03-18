import ENV from '@environment';
import axios from 'axios';

const _public = {};

_public.get = (uri, query) => {
  return request({
    uri: uri,
    method: 'get',
    query: query
  });
};

function request(args){
  const params = getParams(args);
  const url = `${ENV.BASE_API_URL}/${args.uri}`;
  return axios[args.method](url, params);
}

function getParams(args){
  if(args.query)
    return {
      params: args.query
    };
  return args.body;
}

export default _public;
