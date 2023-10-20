import http from "./init";
import qs from "qs";
export const getRoleList = (data) => {
  return http({
    url: "/api/role/getRoleList",
    method: "post",
  });
};
export const roleAddOrModify = (data) => {
  return http({
    url: "/api/role/roleAddOrModify",
    method: "post",
    data: qs.stringify(data),
  });
};
export const deleteMenus = (data) => {
  return http({
    url: "/api/me/deleteMenus",
    method: "post",
    data: qs.stringify(data),
  });
};