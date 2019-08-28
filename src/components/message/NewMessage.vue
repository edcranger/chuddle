<template>
  <div id="new-message">
    <v-form @submit.prevent="addMessage()">
      <v-text-field v-model="item.newMessage" label="Type a message"></v-text-field>
      <!-- <v-textarea name="input-7-1" v-model="newMessage" label="Type a message" hint="Hint text"></v-textarea> -->
    </v-form>
    <p class="red--text" v-if="feedback">{{feedback}}</p>
    <div v-if="this.$store.getters.getMessage.length > 0"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import { userInfo } from "os";
export default {
  name: "NewMessage",
  data() {
    return {
      item: {
        newMessage: null,
        userInfo: {}
      },
      feedback: null
    };
  },
  firestore() {
    return {
      messages: db.collection("messages")
    };
  },
  methods: {
    addMessage: function() {
      if (this.item.newMessage) {
        this.$store.commit("addMessage", this.item);
        this.$firestore.messages.add({
          from: {
            id: this.item.userInfo.uid,
            name: this.item.userInfo.displayName,
            avatar: this.item.userInfo.photoURL
          },
          message: this.item.newMessage,
          time: Date.now()
        });
        this.item.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a message";
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("setMessages");
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.item.userInfo = user;
      } else {
        this.item.userInfo = {};
      }
    });
    console.log(this.messages);
  }
};
</script>

<style>
#new-message {
  width: 95%;
}
</style>