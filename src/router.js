import { createRouter, createWebHistory } from "vue-router";
import ResourceHome from "@/views/ResourceHome.vue";
import ResourceNew from "@/views/ResourceNew.vue";
import ResourceRoutes from "@/views/ResourceRoutes.vue";

const routes = [
    // {path: "/",name: "base", redirect: "/resources"},
    {path: "/",name: "base", redirect: {name: "resourceHomePage"}},
    {
      path: "/resources",
      name: "resourceHomePage", 
      component:ResourceRoutes,
      children:[
        {path: "",name: "resourceHome", component:ResourceHome},
        {path: "new",name: "resourceNewPage", component:ResourceNew}
      ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
