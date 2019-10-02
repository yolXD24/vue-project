<template>
  <v-app>
    <v-content >
       <div id="app">
        <router-view @authenticated="setAuthenticated" />
    </div>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/modules/NavBar.vue";
export default {
  components: {
    NavBar
  },
  name: "App",
  data() {
    return {
      authenticated: false
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "signin" }).catch((err)=>{
      });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
      this.$router.replace({ name: "home" }).catch((err)=>{
      });
    },
    logout() {
      this.authenticated = false;
    }
  }
};
</script>
