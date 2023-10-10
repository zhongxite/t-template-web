import { defineStore } from "pinia";
import { getUserRouter } from "@/api/user";
export const init = defineStore({
  id: "init",
  state: () => ({
    userInfo: {},
    isShowLoadingBox: false,
    token: "",
    routerList: [],
  }),
  actions: {
    getRouter(router,url) {
      const modules = import.meta.glob("/src/**/**/*.vue"); // 导入
      if (this.routerList.length == 0) {
        getUserRouter().then((res) => {
          if (res.code == 200) {
            this.routerList = res.data.router;
          }
        });
      }
      let routeInit = [];
      this.routerList.forEach((item) => {
        let route = {};
        route = {
          name: item.name,
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
              name: items.name,
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
