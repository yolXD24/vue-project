<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-row
      v-if="!preview"
      align="center"
      justify="center"
    >
      <v-col cols="11">
        <v-card :loading="loading">
          <v-toolbar
            class="elevation-1"
            color="grey lighten-3"
          >
            <v-toolbar-title>Claim Form</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              id="code"
              v-model="code"
              label="Claim Code"
              prepend-icon="mdi-lock"
              type="text"
            ></v-text-field>
          </v-card-text>

          <center>
            <v-btn
              color="primary"
              class="white--text text--accent-5"
              rounded
              with="500"
              dark
              @click="checkCode"
            >Check Document</v-btn>
          </center>
          <br />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-container class="justify-center">
        <center>
          <!-- <div class="preview"></div> -->

          <div>
            <pdf
              v-if="preview"
              ref="pdf_preview"
              :src="createdPDF"
              @page-loaded="preview = true"
              style="width: 70%"
            ></pdf>
            <br>
            <br>
            <v-btn
              v-if="preview"
              @click="printPDF()"
            >
              print
            </v-btn>
          </div>
        </center>

      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import pdf from 'vue-pdf'
import jwt_decode from "jwt-decode";
import generatePDF from "../system/functions/generatePDF";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import GenerateForm from "@/system/forms/generateForm.js";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import axios from "axios";
// import PDFobject from "pdfobject";
import printJS from 'print-js';

export default {
  data() {
    return {
      code: "",
      preview: false,
      file: "",
      loading: false,
      createdPDF: ""
    };
  },
  components: {
    pdf
  },
  methods: {

    checkCode() {
      this.loading = true;
      generatePDF.generatePDF(this.code, this.$store.getters.user)
        .then(generated_pdf => {
          this.preview = true
          this.loading = false;
          this.createdPDF = generated_pdf;
          this.code = "";
        }).catch(err => {
          this.preview = false;
          this.loading = false;
        })
    },
    printPDF() {
      var pdfFile = new Blob([this.createdPDF], {
        type: "application/pdf"
      });
      var pdfUrl = URL.createObjectURL(pdfFile);
      printJS({
        printable: pdfUrl,
        type: 'pdf',
        showModal: true,
        modalMessage: "ExpressDocX is generating preview...",
        onPdfOpen: () => {
          console.log("ok")
        },
        onPrintDialogClose: () => {
          this.preview = false
        }
      });

    }
  }
};
</script>
