import { createRouter, createWebHistory } from "vue-router";
import ResourceHome from "@/views/ResourceHome.vue";
import ResourceNew from "@/views/ResourceNew.vue";
import ResourceDetailPage from "@/views/ResourceDetailPage.vue";

const routes = [
    {path: "/",name: "base", redirect: {name: "resourceHomePage"}},
    {path: "/resources",name: "resourceHomePage", component:ResourceHome},
    {path: "/resources/new",name: "resourceNewPage", component:ResourceNew},
    {path: "/resources/:id",name: "resourceDetailPage", component:ResourceDetailPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active"
})

export default router;
