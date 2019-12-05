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
            :items="logs"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
@import "/assets/style.css";
</style>
<script>
export default {
  data() {
    return {
      headers: [
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
          text: "Action",
          value: "action"
        },
         
        {
          sortable: true,
          text: "Date",
          value: "date"
        }
      ],
      transactions: []
    };
  },
  computed:{
    logs(){
      return this.transactions
    }
  },
  mounted() {
  
    this.$store.dispatch("loadHistoryTable").then(data => {
      this.transactions = data;

    }).catch(error => {
      this.$emit("notify", "Something went wrong!!");
    })
  }
};
</script>
