<template>
  <v-app id="body" style="'background :white'">
      <NavBar  />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
import NavBar from "./components/NavBar";
export default {
  components: {
    NavBar
  }
};
</script>