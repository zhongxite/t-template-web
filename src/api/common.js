import http from "./init";
import qs from "qs";
export const exportFile = (params) => {
  return http({
    url: "/api/common/exportFile",
    method: "get",
    params,
    responseType:"blob"
  });
};
