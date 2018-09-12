import merge from './merge';
import axios from 'axios';
export const request = function (method = 'get') {
    return function (url, data = {}, config = {}) {
        const axiosConfig = merge(true, {}, { url, method, data }, config);
        return axios.request(axiosConfig);
    };
};
export default function () {
    const GET = request('get');
    const POST = request('post');
    const PUT = request('put');
    const DELETE = request('delete');
    return { GET, POST, PUT, DELETE };
}
