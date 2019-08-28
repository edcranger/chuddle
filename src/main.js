import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
import router from "./router";
import store from "@/store/store";
import vuetify from "./plugins/vuetify";
import VueFirestore from "vue-firestore";
import VueChatScroll from "vue-chat-scroll";

Vue.use(VueFirestore);
Vue.use(VueChatScroll);
Vue.use(require("vue-moment"));

Vue.config.productionTip = false;

let app = null;

Vue.config.productionTip = false;

//wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  //init app if not already created
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
