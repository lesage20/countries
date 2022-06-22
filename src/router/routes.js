const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "detail/:name",
        component: () => import("pages/DetailPage.vue"),
        name: "detail",
      },
    ],
  },
  {
    path: "/calc/",
    component: () => import("layouts/CalcLayout.vue"),
    children: [{ path: "", component: () => import("pages/CalcPage.vue") }],
    name: "calculator",
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
