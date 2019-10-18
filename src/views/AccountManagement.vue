<template>
  <v-container fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="11">
        <v-card-text class="display-1 text-center font-weight-light">
          Accounts Management
        </v-card-text>
        <v-card class="elevation-4">
          <template>
            <v-data-table
              :headers="headers"
              :items="accounts"
              class="elevation-1"
            >
              <template v-slot:item.action="{ item }">
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </template>
        </v-card>
      </v-col>
      <!-- <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar> -->
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      // snackbar: false,
      // text: "",
      // timeout: 2000,
      headers: [
        {
          sortable: true,
          text: "Username",
          value: "username"
        },
        {
          sortable: true,
          text: "Firstname",
          value: "firstname"
        },
        {
          sortable: true,
          text: "Lastname",
          value: "lastname"
        },
        {
          sortable: true,
          text: "Position",
          value: "position"
        },
        {
          sortable: false,
          text: "Action",
          value: "action"
        }
      ],
      accounts: []
    };
  },
  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      const url = "http://localhost:4000/admin/accounts";
      axios
        .post(url)
        .then(res => {
          this.accounts = jwt_decode(res.data.accounts).id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteItem(item) {
      const index = this.accounts.indexOf(item);
      this.accounts.splice(index, 1);
      const url = "http://localhost:4000/admin/deleteAccount";
      axios
        .post(url, { _id: item._id })
        .then(res => {
          if (res.data) {
            this.$emit("notify", "Deleted Successfully!");
          } else {
            this.$emit("notify", "Deleted Failed!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
