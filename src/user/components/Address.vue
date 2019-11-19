<template>
  <v-row justify="space-between">
    <v-col class="px-10" cols="12" sm="6" md="6">
      <v-text-field v-model="address.sitio" label="Sitio"></v-text-field>
    </v-col>
    <v-col class="px-10" cols="12" sm="6" md="6">
      <v-text-field v-model="address.barangay" label="Barangay"></v-text-field>
    </v-col>
    <v-col class="px-10" cols="12" sm="6" md="6">
      <v-text-field v-model="address.municipality" label="Municipality"></v-text-field>
    </v-col>
    <v-col class="px-10" cols="12" sm="6" md="6">
      <v-text-field v-model="address.province" label="Province"></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    address: {
      sitio: String,
      barangay: String,
      municipality: String,
      province: String
    }
  }
};
</script>