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
    <!-- <VueDocPreview :value="file" type="office" /> -->
  </v-container>
</template>

<script>
import jwt_decode from "jwt-decode";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "@/forms/generateForm.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from "axios";
export default {
  data() {
    return {
      code: "",
      file: "",
      loading: false
    };
  },
  methods: {
    toCapital(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    checkCode() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      axios({
        url: "http://localhost:4000/admin/files/code"
      })
        .then(res => {
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
          var emp = jwt_decode(localStorage.getItem("token")).id;
          var fullname =
            this.toCapital(res.data.firstname) +
            " " +
            this.toCapital(res.data.lastname);
          var incharge =
            this.toCapital(emp.firstname) + " " + this.toCapital(emp.lastname);
          setTimeout(() => {
            var win = window.open("", "_blank");
            pdfMake
              .createPdf(
                GenerateForm.createForm(this.code, fullname, incharge, details)
              )
              .open({}, win);
            GenerateForm.clear();
            this.code = "";
          }, 1000);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
