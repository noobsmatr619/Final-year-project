import axios from "axios";
import { BASE_URL } from "./baseUrl";
//endpoint for deleting api crm token so that later can be used to log out and stop user backing to main screen
export const deleteApi = endPoint => {
  let token = "";
  let localtoken = localStorage.getItem("CRM_TOKEN");
  if (localtoken) {
    token = localtoken;
  }
  return new Promise((resolve, reject) => {
    return axios
      .delete(BASE_URL + endPoint, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
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
