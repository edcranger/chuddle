<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <h1 class="text-center display-3">
            <span class="blue--text">Chu</span>ddle
          </h1>
          <p class="text-center title">Chat and huddle</p>
          <div class="text-center">
            New to Chuddle?
            <a href="#">Create an Account</a>
          </div>
          <v-form>
            <v-text-field label="Login" name="login" prepend-icon="person" type="text"></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
            ></v-text-field>
          </v-form>
          <v-btn color="blue" block dark route to="/dashboard">Login</v-btn>
          <p class="text-center my-2">OR</p>
          <v-btn color="white" block @click="signInWithGoogle()">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              class="mr-2"
              height="25"
              contain
            />Continue with Google
          </v-btn>
          <p class="overline text-center mt-5">By Vertive Interactive</p>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {
    signInWithGoogle: function() {
      let ref = db.collection("users").doc();
      var provider = new firebase.auth.GoogleAuthProvider();

      ref.get().then(doc => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            if (doc.exists) {
              console.log("Document data:", doc.data());
            } else {
              db.collection("users")
                .doc(user.uid)
                .set({
                  adminName: user.displayName,
                  adminId: user.uid
                })
                .then(() => {});
            }

            this.$router.replace("/dashboard");
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      });
    }
  }
};
</script>
     