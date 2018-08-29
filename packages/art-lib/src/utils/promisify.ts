import merge from './merge';

type Api = (o: any, p?: any[]) => any;
type returnType = (o: any, p: any[]) => Promise<any>;

export default (api: Api): returnType => {
  return (options?, ...params) => {
    return new Promise((resolve, reject) => {
      api(merge(true, {}, options, { resolve, reject }), ...params);
    });
  };
};