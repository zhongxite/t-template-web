import { createApp,createVNode } from "vue";
import "./style.css";
import "remixicon/fonts/remixicon.css";
import * as Icons from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import App from "./App.vue";
import router from "@/router/app";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { init } from "@/common/init";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(pinia);
init().getRouter(router);

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
const Icon = (props) => {
  const { icon } = props;
  return createVNode(Icons[icon]);
};
app.component("Icon", Icon);

app.use(router).use(ElementPlus).mount("#app");
