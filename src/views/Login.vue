<template>
  <v-container id="body" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="4">
        <br />
        <br />
        <br />
        <br />
        <br />
        <v-card class="mycard mx-10" :loading="loading">
          <br />
          <center>
            <v-avatar size="100">
              <img position="center" src="@/assets/logo.png" alt="logo" />
            </v-avatar>
            <v-card-title primary-title class="justify-center ">
              <div>
                <div class="blue--text title  darken-1--text display-1 ">
                  Xpress_DocX
                </div>
              </div>
            </v-card-title>
          </center>

          <v-card-text id="card-body">
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
            <br />
            <center>
              <v-btn
                color="primary"
                width="200"
                :disabled="disable"
                @click="login()"
                rounded
                >Login</v-btn
              >
            </center>
          </v-card-text>
          <br />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
#body {
  height: 100%;
  width: 100% !important;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("https://images.unsplash.com/photo-1441205400075-68a01d4c5108?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1366&h=768&fit=crop&ixid=eyJhcHBfaWQiOjIzODd9");
  background-size: 100%;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.mycard {
  opacity: 0.8 !important;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      disable: false,
      username: "",
      password: ""
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
      this.loader(true);
      const url = "http://localhost:4000/admin/login";
      axios
        .post(url, credentials)
        .then(res => {
          setTimeout(() => {
            this.loader(false);
          }, 1000);
          if (this.username != "" && this.password != "") {
            if (res.data.auth) {
              this.$emit("notify", "Welcome " + this.username + " !");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("default", res.data.default_pass);
              setTimeout(() => {
                location.reload(true);
              }, 200);
            } else {
              this.password = "";
              this.username = "";
              this.$emit("notify", "Invalid Credentials");
            }
          } else {
            this.$emit("notify", "Fields cannot be empty");
          }
        })
        .catch(err => {
          this.$emit("notify", "Please try again!");
          setTimeout(() => {
            this.loader(false);
          }, 1000);
        });
    },
    loader(status) {
      this.loading = status;
      this.disable = status;
    }
  }
};
</script>
