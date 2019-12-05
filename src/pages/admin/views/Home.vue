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
            <v-form
              lazy-validation
              ref="form"
            >
              <v-text-field
                id="code"
                v-model="code"
                label="Enter Transaction Code"
                :rules="[v=>v.length === 10||'Invalid Transaction code!']"
                prepend-icon="mdi-lock"
                type="text"
              ></v-text-field>
            </v-form>
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
            <pdf :src="dataUrl">
            </pdf>
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

                  <v-btn
                    class="ma-2"
                    color="primary"
                    rounded
                    large
                    width="300"
                    @click="printPDF()"
                  >print</v-btn>
                  <v-btn
                    class="ma-2"
                    color="primary"
                    rounded
                    large
                    width="300"
                    @click="createdPDF =''"
                  >Close Preview</v-btn>
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
import pdf from 'pdfvuer'
import generatePDF from "@/system/functions/generatePDF";
import printJS from "print-js";
export default {
  data() {
    return {
      details: null,
      code: "",
      dataUrl: "",
      loadingPreview: false,
      file: "",
      loading: false,
      createdPDF: "",
      user: null
    };
  },
  components: {
    pdf,
  },
  computed: {
    preview() {
      return this.createdPDF !== "";
    }
  },
  methods: {
    loadPDF() {
      this.loadingPreview = true
    },
    validate() {
      if (this.code.length) {
        if (this.$refs.form.validate()) {
          this.checkCode();
        } else {
          this.$emit("notify", "Invalid Transaction Code")
        }
      } else {
        this.$emit("notify", "Transaction code is empty!")
      }
    },
    checkCode() {
      this.loading = true;
      this.loadingPreview = true
      generatePDF
        .generatePDF(this.code, this.$store.getters.user)
        .then(result => {
          this.loadingPreview = !this.loadingPreview
          this.details = result.details;
          this.loading = false;
          this.createdPDF = result.pdf;
          this.dataUrl = result.dataUrl;
          this.user = result.details;
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
          this.loadingPreview = false;
          this. afterPrint("view")
        }
      });
    },
    afterPrint(action) {
     
      this.$store.state.axios.post(this.$store.state.url + "saveTransaction", {
        name: this.user.name,
        action:action,
        request: this.user.request,
        officer: `${this.$store.getters.user.firstname} ${this.$store.getters.user.lastname}`,
        date: new Date().toLocaleString()
      })
    }
  },
  mounted() {
    (function () {

      if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function (mql) {
          if (mql.matches) {
            console.log("before print");
            
          } else {
            afterPrint("print");
          }
        });
      }
      window.onafterprint = afterPrint;
    }());
  }
};
</script>
