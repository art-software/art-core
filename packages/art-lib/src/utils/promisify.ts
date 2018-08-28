import merge from './merge';

export default (api) => {
  return (options?, ...params) => {
    return new Promise((resolve, reject) => {
      api(merge(true, {}, options, { resolve, reject }), ...params);
    });
  };
};