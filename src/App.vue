<template>
  <v-app app id="body" >
    <Header v-if="token !== null" />
    <v-content dark>
      <router-view />
    </v-content>
  </v-app>
</template>


<script>
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
      token: localStorage.getItem("token"),
    };
  }
};
</script>
