<template>
  <v-container fluid grid-list-xl>
    <v-row v-if="!preview" align="center" justify="center">
      <v-col cols="11">
        <v-card :loading="loading">
          <v-toolbar class="elevation-1" color="grey lighten-3">
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
          <div>
            <pdf
              v-if="preview"
              ref="pdf_preview"
              :src="createdPDF"
              @page-loaded="preview = true"
              style="width: 45%; height :100%"
            ></pdf>
            <br />
            <br />
          </div>
          <div class="text-center">
            <EditForm v-if="preview"/>
            <v-btn class="ma-2" v-if="preview" @click="printPDF()">print</v-btn>
          </div>
        </center>
      </v-container>
    </v-row>
  </v-container>
</template>
<script>
import pdf from "vue-pdf";
import generatePDF from "@/system/functions/generatePDF";
import printJS from "print-js";
import EditForm from "./EditForm";
export default {
  data() {
    return {
      code: "",
      file: "",
      loading: false,
      createdPDF: ""
    };
  },
  components: {
    pdf,
    EditForm
  },
  computed: {
    preview() {
      return this.createdPDF !== "";
    }
  },
  methods: {
    checkCode() {
      this.loading = true;
      generatePDF
        .generatePDF(this.code, this.$store.getters.user)
        .then(generated_pdf => {
          this.loading = false;
          this.createdPDF = generated_pdf;
          this.code = "";
        })
        .catch(err => {
          this.createdPDF = "";
          this.loading = false;
        });
    },
    printPDF() {
      var pdfFile = new Blob([this.createdPDF], {
        type: "application/pdf"
      });
      var pdfUrl = URL.createObjectURL(pdfFile);
      printJS({
        printable: pdfUrl,
        type: "pdf",
        showModal: true,
        modalMessage: "ExpressDocX is generating preview...",
        onPdfOpen: () => {},
        onPrintDialogClose: () => {
          this.preview = false;
        }
      });
    }
  }
};
</script>
