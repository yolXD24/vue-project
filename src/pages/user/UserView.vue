<template>
  <v-app id="inspire">
<<<<<<< HEAD
    <Toolbar v-on:update="update" />
    <v-content>
      <router-view :doc="doc" />
      <br />
=======
    <Toolbar />
    <v-content>
      <router-view />
      <br>
>>>>>>> 8fae224bc82887c2ec04862bded05aaa394576fb
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
export default {
  components: {
    Toolbar
<<<<<<< HEAD
  },
  data() {
    return {
      doc: {
        title: "Barangay Clearance",
        businessMode: false,
        actNo: "Local Government Code of 1991",
        type: "barangay-clearance"
      }
    };
  },
  methods: {
    update(doc) {
      this.doc = doc;
    }
=======
>>>>>>> 8fae224bc82887c2ec04862bded05aaa394576fb
  }
};
</script>