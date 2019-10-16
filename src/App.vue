<template>
  <v-app app id="body">
    <Header v-if="token !== null" />
    <v-content dark id="content">
      <router-view />
      <v-footer padless absolute inset dense >
        <v-col class="text-center" cols="12" v-if="is_default_password === 'true' && token!== null">
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

<style scoped>
</style>

<script>
import Header from "@/components/Menu";
import Login from "@/views/Login";
import jwt_decode from "jwt-decode";
// import { type } from 'os';

export default {
  name: "App",
  components: {
    Login,
    Header
  },
  data() {
    return {
      token: null,
      is_default_password :null
    };
  },
  mounted() {
    this.is_default_password = localStorage.getItem("default");
    this.token = localStorage.getItem("token");
  }
};
</script>
