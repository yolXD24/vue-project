<template>
  <v-app
    app
    id="body"
  >
    <Header v-if="token !== null" />
    <v-content
      dark
      id="content"
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
      <v-footer
        padless
        absolute
        inset
        dense
      >
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
  @import './assets/style.css';
</style>

<script>
/* eslint-disable */
import Header from "@/components/Menu";
import Login from "@/views/Login";
export default {
  name: "App",
  components: {
    Login,
    Header
  },
  data() {
    return {
      token: null,
      is_default_password: null,
      snackbar: false,
      text: "",
      timeout: 2000
    };
  },
  methods: {
    app_notify(notification) {
      this.text = notification;
      this.snackbar = true;
    }
  },
  mounted() {
    this.is_default_password = localStorage.getItem("default");
    this.token = localStorage.getItem("token");
  }
};
</script>
