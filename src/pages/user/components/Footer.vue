<template>
  <v-card height="150">
    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        <strong>Xpress_DocX</strong>
        @ {{ new Date().getFullYear() }} <About/>
      </v-col>
    </v-footer>
  </v-card>
</template>
<script>
import About from "../views/About.vue";
export default {
  components: {
    About
  }
}
</script>
