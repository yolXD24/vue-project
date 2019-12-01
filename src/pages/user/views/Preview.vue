
<template>
  <v-card>
    <pdf :src="url" style="width: 100%; height :100%"></pdf>
  </v-card>
</template>
<script>
import pdf from "vue-pdf";
export default {
  name: "Preview",
  components: {
    pdf
  },
  props: ['url']
};
</script>
