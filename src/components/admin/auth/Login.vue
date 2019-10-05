<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <v-card elevation-24 style="padding: 20px; border: 1px;">
          <v-card-text>
            <h6 class="display-1 text-center font-weight-regular">Login</h6>
            <v-form>
              <br />
              <v-text-field
                clearable
                v-model="username"
                label="Username"
                prepend-icon="mdi-account"
                type="text"
                color="primary"
              ></v-text-field>
              <v-text-field
                clearable
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                color="primary"
              ></v-text-field>
            </v-form>
            <center>
              <v-btn color="primary" width="200px" rounded big @click="login()"
                >Login</v-btn
              >
            </center>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { axios } from "@/plugins/axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      snackbar: false,
      text: "Invalid Credentials!!",
      timeout: 2000
    };
  },
  methods: {
    login() {
      var credentials = {
        username: this.username,
        password: this.password
      };
      const url = "http://localhost:4000/admin/login";
      axios.post(url, credentials).then(res => {
        if (this.username != "" && this.password != "") {
          if (res.data.auth) {
            this.text = "Welcome " + this.username + " !";
            this.snackbar = true;
            // setTimeout(() => {
            //   this.$emit("authenticated", true);
            // }, 1500);
            // localStorage.setItem("user", true);

            // for testing
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("jwt", res.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("authenticated", true);
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
               this.$router.push("home");
              }
            }
          } else {
            localStorage.setItem("user", null);
           localStorage.setItem("jwt", null);
            this.password = "";
            this.username = "";
            this.text = "Invalid Credentials";
            this.snackbar = true;
          }
        } else {
          this.text = "Fields cannot be empty";
          this.snackbar = true;
        }
      });
    }
  }
};
</script>
