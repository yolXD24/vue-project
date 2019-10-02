<template>
  <v-app>
    <v-content>
       <div id="app">
       <NavBar/>
       <Footer/>
    </div>
    </v-content>
  </v-app>
</template>
<script>
import NavBar from "../../modules/NavBar.vue";
import Footer from "../../modules/Footer.vue";
export default {
  components: {
    NavBar,
    Footer
  },
};
</script>
