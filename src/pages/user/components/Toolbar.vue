<template >
  <v-app-bar app light>
    <v-btn text x-large @click="$router.push('/user/home')">
      <span>Express</span>
      <span class="font-weight-light">_docx</span>
    </v-btn>
    <v-spacer></v-spacer>
    <Menu ref="toolbar" v-on:type_update="update" />
  </v-app-bar>
</template>
<script>
import Menu from "./Menu.vue";
import Vue from "vue";
export default {
  components: {
    Menu
  },
  methods: {
    update(doc) {
      this.$emit("update", doc);
      console.log(doc);
    }
  }
};
</script>