import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Messages from "./views/Messages.vue";
import Task from "./views/Task.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/messages",
      name: "messages",
      component: Messages,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/task",
      name: "task",
      component: Task,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next({ name: "home" });
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
