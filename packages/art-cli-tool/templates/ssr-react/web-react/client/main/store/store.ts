import MainService from '../services/MainService';
import { createStore, applyMiddleware } from 'redux';
import { dataReducer } from '../reducer/reducer';
import thunkMiddleware from 'redux-thunk';

const mainService = new MainService();

const storeData = (data) => ({
  type: 'STORE_DATA',
  data,
});

export const fetchDataMain = () => {
  return (dispatch) => {
    return mainService.mainTest()
      .then((result) => {
        console.log('server fetch result data: ', result.data);
        dispatch(storeData(result.data));
      });
  };
};

export default (initialState?) => {
  return createStore(dataReducer, initialState, applyMiddleware(thunkMiddleware));
};