<template >
  <v-container>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Express</span>
        <span class="font-weight-light">_docx</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Menu/>
    </v-app-bar>
  </v-container>
</template>
<script>
import Menu from "./Menu.vue";
import Vue from "vue";
export default {
  components: {
    Menu
  }
}
</script>