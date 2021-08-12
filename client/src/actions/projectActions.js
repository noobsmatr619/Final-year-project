import { baseUrl } from '../baseUrl';
import _ from 'lodash';
import axios from 'axios';
import * as Type from './types';
//create new projects for the team/users 
export const createProject = (name, des, date) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${baseUrl}/projects/createProject`,
      { project: name, description: des, dueDate: date },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      }
    );
    dispatch(getAllProject());
    return true;
  } catch (error) {
    console.log(error.response);
    return false;
  }
};
// this will assign to team and uers dependently 
export const assignProject = (id, teamId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${baseUrl}/projects/assignProject`,
      { id: id, teamId: teamId },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      }
    );
    dispatch(getAllProject());
    return true;
  } catch (error) {
    console.log(error.response);
    return false;
  }
};
// sends a list of project to be choosen from for all the users to see 
export const getAllProject = () => async (dispatch) => {
  try {
    const projects = await axios.get(`${baseUrl}/projects/getAllProjects`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    });
    dispatch({
      type: Type.GET_ALL_PROJECTS,
      payload: projects.data.data
    });
  } catch (error) {
    // debugger; to debug routes 
    const token = localStorage.getItem('CRM_TOKEN');
    // console.log(token); check fro tokens 
    // debugger;
    console.log(error);
  }
};
