<template>
    <v-row justify="space-between">
      <v-col class="px-10" cols="12" sm="6" md="6">
        <v-text-field v-model="name.firstName" label="First Name"></v-text-field>
      </v-col>
      <v-col class="px-10" cols="12" sm="6" md="6">
        <v-text-field v-model="name.middleName" label="Middle Name"></v-text-field>
      </v-col>
      <v-col class="px-10" cols="12" sm="6" md="6">
        <v-text-field v-model="name.lastName" label="Last Name"></v-text-field>
      </v-col>
      <v-col class="px-10" cols="12" sm="6" md="6">
        <v-text-field v-model="name.suffix" label="Suffix"></v-text-field>
      </v-col>
    </v-row>
</template>
<script>
export default {
  props: {
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
      suffix: String
    }
  }
};
</script>