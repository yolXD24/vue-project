<template>
  <v-app id="inspire">
    <Toolbar v-on:update="update" />
    <v-content>
      <router-view :doc="doc" />
      <br />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
export default {
  components: {
    Toolbar
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
  }
};
</script>