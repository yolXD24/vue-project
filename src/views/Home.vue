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
      this.preview = true
      // axios.get("http://localhost:4000/admin/files/code/" + this.code)
      //   .then(res => {
      //     // console.log(res);

      //     this.loading = false;
      //     var today = new Date();
      //     const monthNames = [
      //       "January",
      //       "February",
      //       "March",
      //       "April",
      //       "May",
      //       "June",
      //       "July",
      //       "August",
      //       "September",
      //       "October",
      //       "November",
      //       "December"
      //     ];

      //     var details = {
      //       business: "Internet Shop",
      //       location: "Nasipit , Talamban",
      //       date: {
      //         year: today.getFullYear(),
      //         month: monthNames[today.getMonth()],
      //         day: today.getDate()
      //       },
      //       exp_date: {
      //         year: today.getFullYear(),
      //         month: monthNames[today.getMonth() + 3],
      //         day: today.getDate() - 1
      //       }
      //     };
      //     var emp = this.$store.getters.user
      //     var fullname =
      //       this.toCapital(res.data.firstname) +
      //       " " +
      //       this.toCapital(res.data.lastname);
      //     var incharge =
      //       this.toCapital(emp.firstname) + " " + this.toCapital(emp.lastname);
      //     var created_pdf;
      //     pdfMake.createPdf(
      //       GenerateForm.createForm(this.code, fullname, incharge, details)
      //     ).getBuffer((buffer) => {
      //       this.createdPDF = buffer;
      //     })
    
      //     GenerateForm.clear();
      //     this.code = "";
      //   })
      //   .catch((err) => {
      //     this.loading = false;
      //     console.log(err);
      //   });
    },
    printPDF() {
      // this.preview = false
      var pdfFile = new Blob([this.createdPDF], {
        type: "application/pdf"
      });
      var pdfUrl = URL.createObjectURL(pdfFile);
      printJS({ printable: pdfUrl, type: 'pdf', showModal: true, modalMessage: "ExpressDocX is generating preview...", onPdfOpen: () => { console.log("ok") }, onPrintDialogClose: () => { this.preview = false } });

      var beforePrint = function () {
        console.log('Functionality to run before printing.');
      };

      var afterPrint = function () {
        console.log('Functionality to run after printing');
      };


      if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function (mql) {
          if (mql.matches) {
            beforePrint();
          } else {
            afterPrint();
          }
        });
      }

      window.onbeforeprint = beforePrint;
      window.onafterprint = afterPrint;

    }
  }

};
</script>
