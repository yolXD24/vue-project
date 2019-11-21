<template>
  <v-tabs id="tabs" color="accent-4" right>
    <v-tab
      v-for="item in items"
      :key="item.title"
      :to="item.link?item.link:''"
      @click="setType(item.type)"
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
import { link } from "fs";
export default {
  data() {
    return {
      type: "",
      businessMode: false,
      items: [
        {
          title: "Barangay Clearance",
          icon: "mdi-home",
          type: "barangay-clearance",
          link: "/user/get/request-form"
        },
        {
          title: "Barangay Indigency",
          icon: "mdi-home",
          type: "barangay-indigency"
        },
        {
          title: "Business Clearance",
          icon: "mdi-home",
          type: "business-clearance"
        }
      ]
    };
  },
  methods: {
    setType(type) {
      this.type = type;
      if (type == "business-clearance") {
        this.businessMode = true;
      }
      this.$emit("type_update", {
        type: this.type,
        businessMode: this.businessMode
      });      
    }
  }
};
</script>
