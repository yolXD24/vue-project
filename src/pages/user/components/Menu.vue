<template>
  <v-tabs id="tabs" color="accent-4" right>
    <v-tab
      v-for="item in items"
      :key="item.title"
      :to="item.link"
    >{{item.title}}</v-tab>
    <v-tab  to="/user/home">Home</v-tab>
  </v-tabs>
</template>
<style scoped>
#tabs {
  width: 50%;
}
</style>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      items: [
        {
          title: "Barangay Clearance",
          link: "/user/get/request-form/barangay-clearance"
        },
        {
          title: "Barangay Indigency",
          link: "/user/get/request-form/barangay-indigency"
        },
        {
          title: "Business Clearance",
          link: "/user/get/request-form/business-clearance"
        }
      ]
    };
  }
};
</script>
