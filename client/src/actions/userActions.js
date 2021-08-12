import { baseUrl } from '../baseUrl';
import axios from 'axios';
import * as Type from './types';
//get user for actions 
export const getUser = () => async (dispatch) => {
  try {
    // debugger;
    const token = localStorage.getItem('CRM_TOKEN');
    // console.log(token);
    // debugger;

    const employee = await axios.get(`${baseUrl}/auth/getAllEmployees`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    });
    console.log(employee);
    dispatch({
      type: Type.GET_USER,
      payload: employee.data.data
    });
  } catch (error) {
    // debugger;
    const token = localStorage.getItem('CRM_TOKEN');
    // console.log(token);
    // debugger;
    console.log(error);
  }
};
