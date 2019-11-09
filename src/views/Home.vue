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
      <v-container>
        <!-- <div class="preview">
        </div> -->
         <pdf :src="createdPDF"></pdf>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import pdf from 'vue-pdf'
import jwt_decode from "jwt-decode";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "@/system/forms/generateForm.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from "axios";
import PDFobject from "pdfobject";
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
  components:{
    pdf
  },
  methods: {
    toCapital(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    checkCode() {
      this.loading = true;
      axios.get("http://localhost:4000/admin/files/code/" + this.code)
        .then(res => {
          console.log(res);

          this.loading = false;
          var today = new Date();
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ];

          var details = {
            business: "Internet Shop",
            location: "Nasipit , Talamban",
            date: {
              year: today.getFullYear(),
              month: monthNames[today.getMonth()],
              day: today.getDate()
            },
            exp_date: {
              year: today.getFullYear(),
              month: monthNames[today.getMonth() + 3],
              day: today.getDate() - 1
            }
          };
          var emp = this.$store.getters.user
          var fullname =
            this.toCapital(res.data.firstname) +
            " " +
            this.toCapital(res.data.lastname);
          var incharge =
            this.toCapital(emp.firstname) + " " + this.toCapital(emp.lastname);
          setTimeout(() => {
            // var win = window.open("", "_blank");
            // pdfMake
            //   .createPdf(

            //   )
            //   .open({}, win);
            var created_pdf;
            pdfMake.createPdf(
              GenerateForm.createForm(this.code, fullname, incharge, details)
            ).getDataUrl((data_url) => {
              this.createdPDF = data_url;
              var options = {
                height: "600px",
                width :"80%"
              };
              this.preview = true
              PDFobject.embed(created_pdf, ".preview",options);
            });


            GenerateForm.clear();
            this.code = "";
          }, 1000);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    }
  }
};
</script>
