import { createRouter, createWebHistory } from "vue-router";
import ClientesView from "./views/ClientesView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/clientes" },
    { path: "/clientes", component: ClientesView },
  ],
});
