<template>
<v-container fluid grid-list-xl>
  <v-row align="center" justify="center">
    <v-col cols="11">
      <v-card :loading="loading">
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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from "axios";
export default {
  data() {
    return {
      code: "",
      file: "",
      loading: false
      // disabled: false
    };
  },
  methods: {
    myMethod() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
      axios({
        url: "http://localhost:4000/admin/files/code"
      })
        .then(res => {
          // https://pdfmake.github.io/docs/document-definition-object/watermark/
          var form_hub = {
            pageSize: "LETTER",
            watermark: {
              text: "{ Form_Hub }",
              color: "skyblue",
              opacity: 0.8,
              fontSize: 100,
              italics: false,
              angle: -50
            },

            content: [
              {
                text: res.data
              }
            ]
          };
          setTimeout(() => {
            var win = window.open("", "_blank");
            pdfMake.createPdf(form_hub).open({}, win);
          }, 3000);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

