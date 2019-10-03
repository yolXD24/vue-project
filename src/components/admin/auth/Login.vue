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
                color="secondary"
              ></v-text-field>
              <v-text-field
                clearable
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                color="secondary"
              ></v-text-field>
            </v-form>
            <center>
              <v-btn color="primary" width="200px" rounded big @click="login()">Login</v-btn>
            </center>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
      {{text}}
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
          if (res.data.response.login) {
            this.$emit("authenticated", true);
            localStorage.setItem("username", res.data.response.users.username);
            localStorage.setItem("password", res.data.response.users.password);
            localStorage.setItem("login", res.data.response.login);
          } else {
            localStorage.setItem("credentials", { login: false });
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
      console.info(localStorage.getItem("username"));
      console.info(localStorage.getItem("password"));
      console.log(localStorage.getItem("login"));
    }
  }
};
</script>
