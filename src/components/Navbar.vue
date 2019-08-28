<template>
  <div id="navbar">
    <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="blue--text">Chu</span>ddle
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon route to="/messages" class="mx-2">
        <v-icon>message</v-icon>
      </v-btn>

      <v-btn icon route to="/task" class="mx-2">
        <v-icon>list_alt</v-icon>
      </v-btn>

      <v-menu left bottom class="mx-2">
        <template v-slot:activator="{ on }">
          <v-avatar v-on="on">
            <v-img :src="userInfo.photoURL" contain alt="avatar"></v-img>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-icon>perm_identity</v-icon>Profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-icon>settings_applications</v-icon>Settings
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout()">
              <v-icon>exit_to_app</v-icon>Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
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
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    }
  }
};
</script>

<style>
</style>