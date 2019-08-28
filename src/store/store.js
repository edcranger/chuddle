import Vue from "vue";
import Vuex from "vuex";
import db from "@/firebase/init";

Vue.use(Vuex);

export default new Vuex.Store({
  firestore() {
    return {
      messages: db.collection("messages")
    };
  },
  state: {
    messages: []
  },
  getters: {
    getMessage: state => {
      return state.messages;
    }
  },
  mutations: {
    setMessages: state => {
      let messages = [];

      db.collection("messages")
        .orderBy("time")
        .onSnapshot(snapshot => {
          messages = [];
          snapshot.forEach(doc => {
            messages.push({ id: doc.id, ...doc.data() });
          });
          state.messages = messages;
        });
    },

    addMessage: (state, item) => {
      state.messages.push(item);
    }
  },
  actions: {
    setMessages: context => {
      context.commit("setMessages");
    }
  }
});
