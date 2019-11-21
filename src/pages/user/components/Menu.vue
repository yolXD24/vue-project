<template>
<<<<<<< HEAD
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
=======
  <v-tabs
    id="tabs"
    color="blue accent-4"
    right
  >
    <v-tab
      v-for="item in items"
      :key="item.title"
      :to="item.link"
    >{{item.title}}</v-tab>
  </v-tabs>
</template>
<style scoped>
#tabs{
>>>>>>> 8fae224bc82887c2ec04862bded05aaa394576fb
  width: 50%;
}
</style>
<script>
import Vue from "vue";
<<<<<<< HEAD
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
=======
export default {
  data: () => ({
    items: [
      { title: "Barangay Clearance", icon: "mdi-home", link: '/user/get/barangay-clearance' },
      { title: "Barangay Indigency", icon: "mdi-home", link: '/user/get/barangay-indigency' },
      { title: "Business Clearance", icon: "mdi-home", link: '/user/get/business-clearance' },
      { title: "Home", icon: "mdi-home", link: '/user/home' }
    ]
  })
>>>>>>> 8fae224bc82887c2ec04862bded05aaa394576fb
};
</script>
