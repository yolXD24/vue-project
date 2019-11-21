<template >
<<<<<<< HEAD
  <v-app-bar app light>
    <v-btn text x-large @click="$router.push('/user/home')">
      <span>Express</span>
      <span class="font-weight-light">_docx</span>
    </v-btn>
    <v-spacer></v-spacer>
    <Menu ref="toolbar" v-on:type_update="update" />
  </v-app-bar>
=======
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
>>>>>>> 8fae224bc82887c2ec04862bded05aaa394576fb
</template>
<script>
import Menu from "./Menu.vue";
import Vue from "vue";
export default {
  components: {
    Menu
<<<<<<< HEAD
  },
  methods: {
    update(doc) {
      this.$emit("update", doc);
      console.log(doc);
    }
=======
>>>>>>> 8fae224bc82887c2ec04862bded05aaa394576fb
  }
};
</script>