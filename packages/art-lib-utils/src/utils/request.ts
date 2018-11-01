import merge from './merge';
import axios, { AxiosRequestConfig } from 'axios';

export type RequestFunc = (url: string, data: object, config: object) => Promise<any>;
export interface RequestMethods {
  GET: RequestFunc;
  POST: RequestFunc;
  PUT: RequestFunc;
  DELETE: RequestFunc;
}

export const request = function (method: string = 'get'): RequestFunc {
  return function (url: string, data = {}, config = {}) {
    const axiosConfig: AxiosRequestConfig = merge(true, {}, { url, method, data }, config);
    return axios.request(axiosConfig);
  };
};

export default function (): RequestMethods {
  const GET = request('get');
  const POST = request('post');
  const PUT = request('put');
  const DELETE = request('delete');

  return { GET, POST, PUT, DELETE };
}