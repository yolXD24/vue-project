<template>
  <v-app app id="body">
    <Sidebar v-if="$store.getters.status" v-on:loggedIn="setToken" />
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
          v-if="is_default_password === 'true' && $store.getters.token !== null"
        >
          <v-alert
            id="v-alert"
            border="left"
            colored-border
            type="error"
            elevation="2"
            >Note : Password must be Changed!</v-alert
          >
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
import Sidebar from "@/components/Sidebar";
import Login from "@/views/Login";
import { isNullOrUndefined, isNull } from "util";
export default {
  name: "App",
  props: ["credentials"],
  components: {
    Login,
    Sidebar
  },
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 2000,
    };
  },
  computed: {
    isSidebar() {
      return !isNullOrUndefined(this.$store.getters.token,);
    },
    is_default_password() {
      return  this.$store.getters.defaultPassword;
    }
  },
  methods: {
    app_notify(notification) {
      this.text = notification;
      this.snackbar = true;
    },
    setToken(token) {
      this.$store.commit('setToken', token);
    }
  }
};
</script>
