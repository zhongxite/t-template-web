const router = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/page/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    name: "redirectName",
    redirect: "/index",
    component: () => import("@/page/home/index.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/page/index/index.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/page/404/index.vue"),
    meta: {
      title: "404",
    },
  },
];
export default router;
