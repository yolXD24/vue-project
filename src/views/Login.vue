<template>
  <v-container id="body">
    <v-row align="center" justify="center">
      <v-col cols="14" sm="10" md="6">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <v-card>
          <v-toolbar class="elevation-1">
            <v-toolbar-title>Login form</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              label="Login"
              v-model="username"
              name="login"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              id="password"
              v-model="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <center>
              <v-btn color="primary" width="200" @click="login()" rounded>Login</v-btn>
            </center>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>


<script>
import  axios  from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      snackbar: false,
      text: "",
      timeout: 2000
    };
  },
  methods: {
    login() {
      var credentials = {
        account: {
          username: this.username,
          password: this.password
        }
      };
      const url = "http://localhost:4000/admin/login";
      axios.post(url, credentials).then(res => {
        if (this.username != "" && this.password != "") {
          if (res.data.auth) {
            this.text = "Welcome " + this.username + " !";
            this.snackbar = true;
            localStorage.setItem("token", res.data.token);
            location.reload(true)
          } else {
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