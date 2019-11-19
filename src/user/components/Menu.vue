<template>
    <v-tabs
      id="tabs"
      color="blue accent-4" right
    >
      <v-tab v-for="item in items" :key="item.title" :to="item.link">{{item.title}}</v-tab>

    </v-tabs>
</template>
<style scoped>
#tabs{
  width: 50%;
}
</style>
<script>
import Vue from "vue";
export default {
  data: () => ({
    items: [
      { title: "Barangay Clearance", icon: "mdi-home", link:'/barangay-clearance'},
      { title: "Barangay Indigency", icon: "mdi-home", link:'/barangay-indigency'},
      { title: "Business Clearance", icon: "mdi-home", link:'/business-clearance'},
      { title: "Home", icon: "mdi-home", link:'/home'}
    ]
  })
};
</script>
