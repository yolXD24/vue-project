<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-row
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
              class=" white--text text--accent-5"
              rounded
              with="500"
              dark
              @click="myMethod"
            >Check Document</v-btn>
          </center>
          <br>
        </v-card>
      </v-col>
    </v-row>
    <!-- <VueDocPreview :value="file" type="office" /> -->

  </v-container>
</template>

<script>
import jwt_decode from "jwt-decode";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "@/middleware/generateForm.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from "axios";
export default {
  data() {
    return {
      code: "",
      file: "",
      loading: false,

      // disabled: false
    };
  },
  methods: {
    toCapital(name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    myMethod() {
      console.log(jwt_decode(localStorage.getItem("token")).id.username);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
      axios({
        url: "http://localhost:4000/admin/files/code"
      })
        .then(res => {
          var today = new Date()
          var details = {
            business: "Internet Shop",
            location:"Nasipit , Talamban",
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            exp_date: today.getFullYear() + '-' + (today.getMonth() + 3) + '-' + today.getDate()
          }
          var emp = jwt_decode(localStorage.getItem("token")).id
          var fullname = this.toCapital(res.data.firstname) + " " + this.toCapital(res.data.lastname)
          var incharge = this.toCapital(emp.firstname) + " " + this.toCapital(emp.lastname)
          setTimeout(() => {
            var win = window.open("", "_blank");
            pdfMake.createPdf(GenerateForm.createForm("clearance", fullname, incharge, details)).open({}, win);
          }, 3000);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
};
</script>

