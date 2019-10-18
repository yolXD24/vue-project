<template>
<v-container fluid grid-list-xl>
  <v-row align="center" justify="center">
    <v-col cols="11">
      <v-card>
        <v-toolbar class="elevation-1" color="grey lighten-3">
          <v-toolbar-title>Claim Form</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
          <v-text-field id="code" v-model="code" label="Claim Code" prepend-icon="mdi-lock" type="text"></v-text-field>
        </v-card-text>
        <center>
          <v-btn color="primary" class=" white--text text--accent-5" rounded with="500" dark @click="myMethod">Check Document</v-btn>
        </center>
        <br>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import printJS from "print-js";
import axios from "axios";
import { type } from "os";
export default {
  data() {
    return {
      code: "",
      file: ""
      // disabled: false
    };
  },
  methods: {
    myMethod() {
      // printJS({ printable: "http://localhost:4000/files/code", type: "pdf", showModal: true });

      // axios
      //   .get("http://localhost:4000/files/code", { code: this.code })
      //   .then(res => {
      //     var fileURL = window.URL.createObjectURL(new Blob([res.data]));

      //     printJS({ printable: fileURL, type: "pdf", showModal: true });

      //     console.log(fileURL);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      axios({
        url: "http://localhost:4000/files/code",
        responseType: "arraybuffer"
      })
        .then(res => {
          printJS({
            printable: someJSONdata,
            properties: ["name", "email", "phone"],
            type: "json"
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

