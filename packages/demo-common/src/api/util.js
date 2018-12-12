/* eslint-disable */
import axios from 'axios';
const defaultsDeep = require('lodash/defaultsDeep');

const instance = axios.create({
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

function createAPI(baseURL) {
  return function(conf) {
    conf = conf || {};
    return instance(
      Object.assign(
        {},
        {
          url: conf.url,
          baseURL: baseURL,
          method: conf.method,
        },
        conf.opts
      )
    );
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach(key => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

function useRequestInterceptor(beforeRequestHandler, errorHandler) {
  return instance.interceptors.request.use(beforeRequestHandler, errorHandler);
}

function useResponseInterceptor(successHandler, errorHandler) {
  return instance.interceptors.response.use(successHandler, errorHandler);
}

function ejectRequestInterceptor(interceptor) {
  instance.interceptors.request.eject(interceptor);
}

function ejectResponseInterceptor(interceptor) {
  instance.interceptors.response.eject(interceptor);
}

function mergeDefaults(...defaults) {
  return (instance.defaults = defaultsDeep(instance.defaults, ...defaults));
}

export {
  createAPI,
  convertRESTAPI,
  useRequestInterceptor,
  useResponseInterceptor,
  ejectRequestInterceptor,
  ejectResponseInterceptor,
  mergeDefaults,
};
