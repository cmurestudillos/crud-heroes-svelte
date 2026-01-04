import { onMount } from "svelte";
import { Router, Route } from "svelte-routing";

// Rutas de la aplicación
const routes = [
  {
    path: "/",
    component: () => import("../components/Heroes.svelte"),
  },
  {
    path: "/heroes",
    component: () => import("../components/Heroes.svelte"),
  },
  {
    path: "/heroes/:id",
    component: () => import("../components/Heroe.svelte"),
  },
  {
    path: "*",
    component: () => import("../components/Error.svelte"),
  },
];

onMount(() => {
  new Router({
    target: document.querySelector("#app"),
    routes,
  });
});
