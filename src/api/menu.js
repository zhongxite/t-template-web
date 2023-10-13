import http from "./init";
import qs from "qs";
export const getMenusList = (data) => {
  return http({
    url: "/api/menu/getMenusList",
    method: "post",
  });
};
export const menusAddOrModify = (data) => {
  return http({
    url: "/api/menu/menusAddOrModify",
    method: "post",
    data: qs.stringify(data),
  });
};
export const deleteMenus = (data) => {
  return http({
    url: "/api/menu/deleteMenus",
    method: "post",
    data: qs.stringify(data),
  });
};