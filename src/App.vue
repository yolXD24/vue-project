<template>
  <v-app>
    <v-content>
       <div id="app">
       <NavBar v-if="!$route.meta.hideNavigation"/>
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/modules/NavBar.vue";
export default {
  components: {
    NavBar
  },
  name: "App",
  data() {
    return {
      authenticated: false,
      username: "yol",
      password: "Torres"
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    }
  }
};
</script>
