<template>
  <v-app id="inspire">
    <Toolbar />
    <v-content>
      <router-view/>
      <br />
    </v-content>
    <Footer />
  </v-app>
</template>
<script>
export default {
  components: {
    Toolbar: () => import('./components/Toolbar'),
    Footer: () => import('./components/Footer'),
  }
};
</script>