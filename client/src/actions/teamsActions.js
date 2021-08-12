import { baseUrl } from '../baseUrl';
import _ from 'lodash';
import { get, post, put, deleteApi } from '../api';

import axios from 'axios';
import * as Type from './types';
//create team with param name and memeber 
export const createTeam = (name, member) => async (dispatch) => {
  try {
    let members = [];
    member.forEach((m) => {
      members.push({ memberId: m.id, memberName: m.displayName });
    });

    const res = await axios.post(
      `${baseUrl}/teams/createTeam`,
      { name: name, members: members },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      }
    );
    dispatch(getAllTeams());
    return true;
  } catch (error) {
    console.log(error.response);
    return false;
  }
};
//get most teams that is available 
export const getAllTeams = () => async (dispatch) => {
  try {
    const teams = await axios.get(`${baseUrl}/teams/getAllTeams`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    });
    dispatch({
      type: Type.GET_ALL_TEAM,
      payload: teams.data.data
    });
  } catch (error) {
    // debugger;
    const token = localStorage.getItem('CRM_TOKEN');
    // console.log(token);
    // debugger;
    console.log(error);
  }
};
// get only signed in user teams
export const getMyTeams = () => async (dispatch) => {
  try {
    const res = await get('/teams/getMyTeams');
    dispatch({
      type: Type.GET_MY_TEAMS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
