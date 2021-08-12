import { baseUrl } from '../baseUrl';
import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as Type from './types';
import setAuthToken from '../utils/setAuthToken';

export const LoadUser = (history) => async (dispatch) => {
  const reseturl = history.location.pathname.slice(
    0,
    history.location.pathname.lastIndexOf('/')
  );
  if (reseturl != '/password/reset') {
    if (localStorage.CRM_TOKEN) {
      setAuthToken(localStorage.CRM_TOKEN);
    }
    try {
      const res = await axios.get(baseUrl + '/auth/getMe');
      dispatch({
        type: Type.LOAD_USER,
        payload: res.data.data
      });
    } catch (error) {
      history.push('/auth');

      console.log(error);
    }
  }
};
const moveUserAtStartRoute = async (history) => {
  try {
    const res = await axios.get(baseUrl + '/auth/getMe');

    toast.success('Login Succesfully');
    if (res.data.data.type === 'admin') {
      history.push('/user-management');
    } else if (res.data.data.type === 'staff') {
      history.push('/staff');
    } else if (res.data.data.type === 'manager') {
      history.push('/manager');
    } else if (res.data.data.type === 'employee') {
      history.push('/emp');
    }
    return true;
  } catch (error) {
    history.push('/auth');
    return true;
  }
};

export const OnlyLoadUser = () => async (dispatch) => {
  if (localStorage.CRM_TOKEN) {
    setAuthToken(localStorage.CRM_TOKEN);
  }
  try {
    const res = await axios.get(baseUrl + '/auth/getMe');
    dispatch({
      type: Type.LOAD_USER,
      payload: res.data.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = (form, history) => async (dispatch) => {
  axios
    .post(baseUrl + '/auth/login', form)
    .then(async (response) => {
      dispatch({
        type: Type.LOGIN_USER,
        payload: response.data
      });
      dispatch(LoadUser(history));
      moveUserAtStartRoute(history);
    })
    .catch((error) => {
      toast.error(error.response.data.error);
    });
};
export const registerUser = (state, history) => async (dispatch) => {
  axios
    .post(baseUrl + '/auth/registerUser', state)
    .then(async (response) => {
      dispatch({
        type: Type.REGISTER_USER,
        payload: response.data
      });
      toast.success('Register Successfully');
      dispatch(LoadUser(history));
      moveUserAtStartRoute(history);
    })
    .catch((error) => {
      toast.error(error.response.data.error);
    });
};

export const LogoutUser = () => (dispatch) => {
  dispatch({ type: Type.LOGOUT_USER });
};
