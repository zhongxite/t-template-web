import http from "./init";
import qs from "qs";
export const login = (data) => {
  return http({
    url: "/api/user/login",
    method: "post",
    data: qs.stringify(data),
  });
};
export const deleteUser = (data) => {
  return http({
    url: "/api/user/deleteUser",
    method: "post",
    data: qs.stringify(data),
  });
};
export const getUserInfo = () => {
  return http({
    url: "/api/user/getUserInfo",
    method: "post",
  });
};
export const updateUserInfo = (data) => {
  return http({
    url: "/api/user/updateUserInfo",
    method: "post",
    data: qs.stringify(data),
  });
};
export const createUser = (data) => {
  return http({
    url: "/api/user/createUser",
    method: "post",
    data: qs.stringify(data),
  });
};
export const getUserList = (params) => {
  return http({
    url: "/api/user/getUserList",
    method: "get",
    params,
  });
};
