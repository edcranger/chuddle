<template>
  <div id="dashboard">
    <Navbar />
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">Welcome to Chuddle</v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn text>Instructions</v-btn>
          <v-btn text>Policy</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import Navbar from "@/components/Navbar";
import { userInfo } from "os";
export default {
  name: "Dashboard",
  components: {
    Navbar
  },
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userInfo = user;
      } else {
        this.userInfo = {};
      }
    });
  }
};
</script>

<style>
</style>