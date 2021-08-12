import axios from "axios";
import { BASE_URL } from "./baseUrl";
//  get crm token 
export const get = endPoint => {
  let token = "";
  let localtoken = localStorage.getItem("CRM_TOKEN");
  if (localtoken) {
    token = localtoken;
  }
  return new Promise((resolve, reject) => {
    return axios
      .get(BASE_URL + endPoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
