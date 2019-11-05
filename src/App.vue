<template>
  <v-app app id="body">
    <Sidebar v-if="isSidebar" v-on:loggedIn="setToken" />
    <v-content dark id="content">
      <router-view v-on:notify="app_notify" v-on:loggedIn="setToken" />
      <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-footer padless absolute inset dense style="background=transparent!">
        <v-col
          class="text-center"
          cols="12"
          v-if="is_default_password === 'true' && token !== null"
        >
          <v-alert
            id="v-alert"
            border="left"
            colored-border
            type="error"
            elevation="2"
          >Note : Password must be Changed!</v-alert>
        </v-col>
      </v-footer>
    </v-content>
  </v-app>
</template>
<style lang="scss">
// @import './assets/style.css';
</style>

<script>
/* eslint-disable */
import Sidebar from "@/components/Menu";
import Login from "@/views/Login";
import { isNullOrUndefined } from "util";
export default {
  name: "App",
  props: ["credentials"],
  components: {
    Login,
    Sidebar
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      snackbar: false,
      text: "",
      timeout: 2000
    };
  },
  computed: {
    isSidebar() {
      return !isNullOrUndefined(this.token);
    },
    is_default_password() {
      return;
    }
  },
  methods: {
    app_notify(notification) {
      this.text = notification;
      this.snackbar = true;
    },
    setToken(token) {
      this.token = token;
    }
  },
  mounted() {
    // this.is_default_password = localStorage.getItem("default");
  }
};
</script>
