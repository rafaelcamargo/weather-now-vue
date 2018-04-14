import { format } from 'date-fns';

const _public = {};

_public.getNow = () => {
  return new Date();
};

_public.format = (dateObj, dateFormat) => {
  return format(dateObj, dateFormat);
};

export default _public;
