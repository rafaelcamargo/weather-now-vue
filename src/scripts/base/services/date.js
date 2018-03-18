import moment from 'moment';

const _public = {};

_public.getNow = () => {
  return new Date();
};

_public.format = (dateObj, format) => {
  return moment(dateObj).format(format);
};

export default _public;
