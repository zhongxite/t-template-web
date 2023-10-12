import http from "./init";
import qs from "qs";
export const getMenusList = (data) => {
  return http({
    url: "/api/menu/getMenusList",
    method: "post",
  });
};
export const addMenus = (data) => {
  return http({
    url: "/api/menu/addMenus",
    method: "post",
    data: qs.stringify(data),
  });
};
