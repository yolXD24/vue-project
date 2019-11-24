<template>
  <v-app id="inspire">
    <Toolbar/>
    <v-content>
      <router-view />
      <br />
    </v-content>
  </v-app>
</template>
<script>
import Toolbar from "./components/Toolbar";
export default {
  components: {
    Toolbar
  }
};
</script>