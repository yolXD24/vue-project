<template >
 <v-app-bar
      app
      light
    >
      <v-btn
        text
        x-large
        @click="$router.push('/user/home')"
      >
        <span>Express</span>
        <span class="font-weight-light">_docx</span>
      </v-btn>
        <v-spacer></v-spacer>
      <Menu />
    </v-app-bar>
  <!-- <v-container fluid="">
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn text x-large @click="$router.push('/user/home')">
          <span>Express</span>
          <span class="font-weight-light">_docx</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Menu />
    </v-app-bar>
  </v-container> -->
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