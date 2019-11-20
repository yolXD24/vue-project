<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="11">
        <v-card class="elevation-4 v-card">
          <v-card-text class="display-1 text-center font-weight-light">Transaction History</v-card-text>
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
@import "../../assets/style.css";
</style>
<script>
import jwt_decode from "jwt-decode";

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

    this.$store.dispatch("loadHistoryTable").then(data => {
      this.transactions = data;
    }).catch(error => {
      this.$emit("notify", "Something went wrong!!");
    })
    // this.$store.state.axios
    //   .post(url, { _id: id })
    //   .then(res => {
    //     this.transactions = res.data;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
};
</script>
