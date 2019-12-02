<template>
  <v-app id="inspire">
    <Toolbar/>
    <v-content>
      <router-view />
      <br />
    </v-content>
    <Footer/>
  </v-app>
</template>
<script>
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
export default {
  components: {
    Toolbar,
    Footer
  }
};
</script>