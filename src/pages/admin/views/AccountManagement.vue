<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="10">
        <v-card class="elevation-4 v-card">
          <v-data-table
            :headers="headers"
            :items="accounts"
            class="elevation-1 v-table"
          >
            <template v-slot:top>
              <v-toolbar
                flat
                color="white"
              >
                <v-toolbar-title>Staff Account Management</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <Register @register_notif="app_notify" />
              </v-toolbar>
              <hr>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                :disabled="item.admin"
                @click="deleteItem(item)"
                text
                small
              >
                <v-icon small>mdi-delete</v-icon>Delete
                <!-- <span v-if="item.admin">(ADMIN)</span> -->
              </v-btn>
              <v-btn
                @click="reset(item._id)"
                text
                small
              >
                <v-icon small>mdi-reload</v-icon> Reset
              </v-btn>
            </template>
          </v-data-table>
          <hr />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Register from "./Register";
import { request_reset } from "@/system/functions/request";
export default {
  components: {
    Register
  },
  data() {
    return {
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
    app_notify(message) {
      if (typeof message !== 'string') {
        this.accounts.push(message.body)
        return this.$emit("notify", message.message)
      }
      this.$emit("notify", message)
    },
    initialize() {
      this.$store
        .dispatch("loadAccountTable")
        .then(accounts => {
          this.accounts = accounts;
        })
        .catch(err => {
          this.$emit("notify", "Something went wrong!!");
        });
    },
    deleteItem(account) {
      const index = this.accounts.indexOf(account);
      this.accounts.splice(index, 1);
      this.$store
        .dispatch("deleteAccount", account)
        .then(res => {
          if (res) {
            this.$emit("notify", "Deleted Successfully!");
          } else {
            this.$emit("notify", "Deleted Failed!");
          }
        })
        .catch(err => {
          this.$emit("notify", "Something went wrong!!");
        });
    },
    reset(account_id) {
      request_reset({account_id:account_id})
        .then(success => {
          this.$emit("notify", success.message);
        }).catch(err => {
          this.$emit("notify", err.message);
        })

    }
  }
};
</script>