<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="11">
        <v-card class="elevation-4 v-card">
          <v-card-text class="display-1 text-center font-weight-light">
            Accounts Management
          </v-card-text>
          <hr />
          <template>
            <v-data-table
              :headers="headers"
              :items="accounts"
              class="elevation-1 v-table"
            >
              <template v-slot:item.action="{ item }">
                <v-btn
                  @click="deleteItem(item)"
                  text
                  small
                >
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                  Delete
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
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
    initialize() {
      this.$store.dispatch('loadTable').then(accounts => {
        this.accounts = accounts
      }).catch(err => {
        this.$emit("notify", "Something went wrong!!");
        console.log(err);
      });
    },
    deleteItem(account) {
      const index = this.accounts.indexOf(account);
      this.accounts.splice(index, 1);
      this.$store.dispatch('deleteAccount', account).then(res => {
        if (res) {
          this.$emit("notify", "Deleted Successfully!");
        } else {
          this.$emit("notify", "Deleted Failed!");
        }
      }).catch(err => {
        this.$emit("notify", "Something went wrong!!");
      })
    }
  }
};
</script>