<template>
  <v-container fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="11">
        <v-card class="elevation-4 v-card">
          <v-card-text class="display-1 text-center font-weight-light"
            >Transaction History</v-card-text
          >
          <hr />
          <v-data-table
            :headers="headers"
            :transactions="transactions"
            hide-default-footer
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
@import "../assets/style.css";
</style>
<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  data() {
    return {
      headers: [],
      transactions: []
    };
  },
  mounted() {
    this.headers = [
      {
        sortable: true,
        text: "Name",
        value: "name"
      },
      {
        sortable: true,
        text: "Request",
        value: "request"
      },
      {
        sortable: true,
        text: "Officer In charge",
        value: "officer"
      },
      {
        sortable: true,
        text: "Date",
        value: "date"
      }
    ];
    const url = "http://localhost:4000/history/transactions";
    const id = jwt_decode(localStorage.getItem("token")).id._id;
    axios
      .post(url, { _id: id })
      .then(res => {
        this.transactions = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
