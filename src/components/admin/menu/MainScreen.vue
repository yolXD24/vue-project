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
              v-model="code"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <center>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" rounded @click="check()">Check Code</v-btn>
        </center>
        <br />
        <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
          {{text}}
          <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { axios } from "@/plugins/axios";
export default {
  props: {
    source: String
  },
  data() {
    return {
      code: "",
      snackbar: false,
      text: "Invalid Credentials!!",
      timeout: 2000
    };
  },
  methods: {
    check() {
      var codes = {
        code: this.code
      };
      const url = "http://localhost:4000/admin/code";
      axios.post(url, codes).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>
