import axios from "axios";
import { BASE_URL } from "./baseUrl";
// coverrididng put data so that can be used as per need 
export const put = (endPoint, data) => {
  let token = "";
  let localtoken = localStorage.getItem("CRM_TOKEN");
  if (localtoken) {
    token = localtoken;
  }
  return new Promise((resolve, reject) => {
    return axios
      .put(BASE_URL + endPoint, data, {
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
