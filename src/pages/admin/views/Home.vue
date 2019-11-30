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
              @click="validate"
            >Check Document</v-btn>
          </center>
          <br />
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="loadingPreview"
      persistent
      style="margin-left:250px!important;"
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Loading Preview ...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <v-container class="justify-center">
        <center>
          <div v-if="preview">
            <pdf
              :src="dataUrl"
              @loading="loadPDF"
            >
            </pdf>
            <!-- <pdf
              ref="pdf_preview"
              :src="createdPDF"
              style="width: 50%; height :100%"
            ></pdf> -->
            <!-- <div>
            <pdf
              v-if="preview"
              ref="pdf_preview"
              :src="createdPDF"
              style="width: 50%; height :100%"
            ></pdf>
            <br />
            <br />
          </div> -->
            <v-row
              align="start"
              justify="center"
            >
              <v-col cols="4">
                <v-row
                  align="end"
                  justify="center"
                  class="transparent"
                >
                  <EditForm :ClientInfo="details" />
                  <v-btn
                    class="ma-2"
                    color="primary"
                    rounded
                    large
                    width="300"
                    @click="printPDF()"
                  >print</v-btn>
                </v-row>
              </v-col>

            </v-row>
          </div>
        </center>
      </v-container>
    </v-row>
  </v-container>
</template>
<script>
// import pdf from "vue-pdf";
import pdf from 'pdfvuer'
import generatePDF from "@/system/functions/generatePDF";
import printJS from "print-js";
import EditForm from "./EditForm";
export default {
  data() {
    return {
      details: null,
      code: "",
      dataUrl: "",
      loadingPreview: false,
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
    // loadPDF() {
    //   this.loadingPreview = true
    // },
    validate() {
      if (this.code.length) {
        this.checkCode();
      } else {
        this.$emit("notify", "Claim code is empty!")
      }
    },
    checkCode() {
      this.loading = true;
      this.loadingPreview = true
      generatePDF
        .generatePDF(this.code, this.$store.getters.user)
        .then(result => {
          this.loadingPreview = false
          this.details = result.details;
          this.loading = false;
          this.createdPDF = result.pdf;
          this.dataUrl = result.dataUrl;
          this.code = "";
        })
        .catch(message => {
          this.loadingPreview = false
          this.$emit("notify", message)
          this.createdPDF = "";
          this.loading = false;
        });
    },
    printPDF() {
      this.loadingPreview = true
      var pdfFile = new Blob([this.createdPDF], {
        type: "application/pdf"
      });
      var pdfUrl = URL.createObjectURL(pdfFile);
      printJS({
        printable: pdfUrl,
        type: "pdf",
        showModal: true,
        modalMessage: "ExpressDocX is generating preview...",
        onPdfOpen: () => { },
        onPrintDialogClose: () => {
          this.preview = false;
          this.loadingPreview = false

        }
      });
    }
  }
};
</script>
