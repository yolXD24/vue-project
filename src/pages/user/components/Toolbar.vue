<template >
  <v-app-bar app light>
    <v-btn text x-large to="/">
      <span>Express</span>
      <span class="font-weight-light">_docx</span>
    </v-btn>
    <v-spacer></v-spacer>
    <Menu />
  </v-app-bar>
</template>
<script>
import Menu from "./Menu.vue";
import Vue from "vue";
export default {
  components: {
    Menu
  }
};
</script>