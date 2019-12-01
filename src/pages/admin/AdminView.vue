<template>
  <v-app
    app
    id="body"
    :style="`background :linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${background})`"
  >
    <Sidebar v-if="$store.state.status  && $route.name != 'notFound' && !$route.meta.user" />
    <v-content>
      <router-view v-on:notify="app_notify" />
      <v-snackbar
        v-model="snackbar"
        :color="color"
        :timeout="timeout"
        absolute
      >
        {{ text }}
        <v-btn
          :color="color=='red' ? 'white ':'blue'"
          text
          @click="snackbar = false"
        >Close</v-btn>
      </v-snackbar>
      <Footer
        v-if="is_default_password && $route.name != 'login'"
       
      />
    </v-content>
  </v-app>
</template>
<style lang="css">
@import "./assets/style.css";
    .addSpace{
      margin-top:200px!important;
    }
</style>
<script>
/* eslint-disable */
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import {
  verifyToken
} from "@/helpers/verifyToken";
import {
  isNull
} from "util";
export default {
  name: "App",
  components: {
    Sidebar,
    Footer
  },
  data() {
    return {
      snackbar: false,
      background: require("./assets/bg.jpg"),
      text: "",
      timeout: 2000,
      color: 'blue'
    };
  },
  computed: {
    is_default_password() {
      return this.$store.getters.defaultPassword;
    }
  },
  methods: {
    app_notify(notification) {
      this.text = notification;
      this.snackbar = true;
    },
    checkLogin() {
      verifyToken()
        .then(valid => {
          if (!valid) {
            this.app_notify("Session Expired");
            this.$store.commit("logout");
            this.$router.push("/admin/login");
          } else {
            this.color = 'dark';
          }
        })
        .catch(err => {
          if (err.response) {
            this.$store.commit("logout");
            this.$router.push("/admin/login");
            this.app_notify("Session Expired");
          } else {
            this.$router.push("/admin/login");
            this.color = 'red';
            this.app_notify("Unable to connect to the server");
            this.checkLogin();
          }

        });
    }
  },
  mounted() {
    if (!isNull(this.$store.state.status)) {
      this.checkLogin();
    }
    this.$store.state.axios
      .get("https://source.unsplash.com/user/cinquantesix")
      .then(res => {
        this.background = res.request.responseURL;
      })
      .catch(err => {
        this.app_notify("Failed to load some images...");
      });
  }
};
</script>
