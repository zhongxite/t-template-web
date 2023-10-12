import { defineStore } from "pinia";
import { getUserRouter } from "@/api/user";
import {  getMenusList } from '@/api/menu';

export const init = defineStore({
  id: "init",
  state: () => ({
    userInfo: {},
    isShowLoadingBox: false,
    token: "",
    routerList: [],
  }),
  actions: {
    getRouter(router,url,isInit) {
      const modules = import.meta.glob("/src/**/**/*.vue"); // 导入
      if (this.routerList.length == 0 || isInit) {
        getMenusList().then((res) => {
          if (res.code == 200) {
            this.routerList = res.data;
            console.log(this.routerList);
          }
        });
      }
      let routeInit = [];
      this.routerList.forEach((item) => {
        let route = {};
        route = {
          name: item.mark,
          path: item.path,
          meta: item.meta,
          component: item.component
            ? modules[`/src/${item.component}.vue`]
            : null, //路由按需加载
        };
        if (item.children) {
          route.children = [];
          item.children.forEach((items) => {
            route.children.push({
              name: items.mark,
              path: items.path,
              meta: items.meta,
              component: modules[`/src/${items.component}.vue`], //路由按需加载
            });
          });
        }
        routeInit.push(route);
      });
      routeInit.forEach((item) => {
        router.addRoute("redirectName", item);
      });
      url&&router.replace({ name:url });
    },
  },
  persist: true,
});
