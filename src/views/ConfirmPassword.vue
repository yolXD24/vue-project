<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          rounded
          dark
          v-on="on"
        >Update</v-btn>
      </template>
      <v-card>
        <v-toolbar
          class="elevation-1"
          color="grey lighten-3"
        >
          <v-toolbar-title>Enter Password to Update Account</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
          <br />
          <div
            :ref="my_ref"
            lazy-validation
          >
            <v-text-field

              class="purple-input"
              v-model="password"
              prepend-icon="mdi-lock"
              type="password"
              label="Password"
              required
              :rules="[v => !!v || 'Password is required']"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="closeDialog"
          >Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="validate"
          >Confirm Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  props: {
    credentials: Object
  },
  data() {
    return {
      dialog: false,
      text: "",
      password: "",
      my_ref: ""
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.password = "";
    },
    validate() {
    //   if (this.$refs.this.my_ref.validate()) {
        this.confirmPass();
    //   }
    },
    confirmPass() {
      var account = {
        id: this.credentials._id,
        password: this.password
      };
      axios
        .post("http://localhost:4000/admin/confirm_password", account)
        .then(res => {
          if (res.data.confirm) {
            this.$emit("is_confirmed", true);
          } else {
            this.password = "";
            this.$emit("is_confirmed", false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
    this.my_ref = "form"
  },
  mounted() {
    console.log(this.my_ref)
  }
};
</script>
