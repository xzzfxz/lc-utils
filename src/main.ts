import { createApp, App } from 'vue';
import AppVue from './App.vue';
import router from './router/index';
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import { Icon, Column, Table } from 'vxe-table';
function useTable(app: App) {
  app.use(Icon).use(Column).use(Table);
}

createApp(AppVue).use(router).use(useTable).mount('#app');
