const _public = {};

_public.set = (key, value) => {
  window.localStorage.setItem(key, value);
};

_public.get = key => {
  return window.localStorage.getItem(key);
};

_public.remove = key => {
  window.localStorage.removeItem(key);
};

export default _public;
