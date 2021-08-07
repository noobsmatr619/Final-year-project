import * as Type from './types';
import { get, post, put, deleteApi } from '../api';

export const createAccident = (form) => async (dispatch) => {
  try {
    const res = await post(`/health/createAccident`, form);
  } catch (error) {
    console.log(error);
  }
};
export const getAccident = (form) => async (dispatch) => {
  try {
    const res = await get(`/health/getAccident`);
    dispatch({
      type: Type.GET_ACCIDENT,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const getlLocationAccident = (form) => async (dispatch) => {
  try {
    const res = await get(`/health/getlLocationAccident`);
    dispatch({
      type: Type.GET_LOCATION_ACCIDENT,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
