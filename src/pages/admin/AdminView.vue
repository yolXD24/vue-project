<template>

  <div
    id="body"
    :style="'background :linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('+background+')'"
  >
    <router-view v-on:notify="app_notify" />
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
    >
      {{ text }}
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >Close</v-btn>
    </v-snackbar>
    <br />
    <br />
    <Footer v-if="is_default_password && $route.name != 'login' " />
  </div>
  <!-- </v-app> -->
</template>
<style lang="css">
@import "./assets/style.css";
</style>
<script>
/* eslint-disable */
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { verifyToken } from "@/helpers/verifyToken";
import { isNull } from "util";
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
      timeout: 2000
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
            this.$router.push("/login");
          }
        })
        .catch(err => {
          this.$store.commit("logout");
          this.$router.push("/login");
          this.app_notify("Session Expired");
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
