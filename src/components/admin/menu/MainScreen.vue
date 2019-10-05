<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Claim Form</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Enter Code"
              name="code"
              prepend-icon="mdi-lock"
              type="text"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <center>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" rounded>Check Code</v-btn>
        </center>
        <br />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>
