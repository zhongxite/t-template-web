import axios from "axios";
import router from "@/router/app";
import { ElNotification } from "element-plus";
import { init } from "@/common/init";
const http = axios.create({
  baseURL: location.origin,
  timeout: 50000,
});
http.interceptors.request.use((config) => {
  return config;
});
http.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data;
    if (code === 200) {
      return response.data;
    }
    if (code == 401) {
      ElNotification({
        title: "提示",
        message: msg,
        type: "error",
      });
      let { token,routerList } = storeToRefs(init());
      token.value = ""
      routerList.value = []
      router.replace({ name: "login" });
    }
    if (code == 400) {
      ElNotification({
        title: "提示",
        message: msg,
        type: "error",
      });
    }
    return response;
  },
  (error) => {
    console.log(error);
    ElNotification({
      title: "提示",
      message: "系统错误，请联系管理员~",
      type: "error",
    });
      router.replace({ name: "login" });
    return Promise.reject(error);
  }
);
export default (options) => {
  let { token } = storeToRefs(init());
  return http({
    url: options.url,
    method: options.method || "get",
    data: options.data || {},
    params: options.params || {},
    headers: options.headers || {
      ...options.headers,
      Authorization: `Bearer ${token.value}`,
    },
    responseType:options.responseType || "json"
  });
};
