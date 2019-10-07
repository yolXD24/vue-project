<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <v-card elevation-24 style="padding: 20px; border: 1px;">
          <v-card-text>
            <h6 class="display-1 text-center font-weight-regular">Register</h6>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="fname"
                :counter="20"
                :rules="nameRules"
                label="Firstname"
                prepend-icon="mdi-rename-box"
                required
              ></v-text-field>
              <v-text-field
                v-model="lname"
                :counter="20"
                :rules="nameRules"
                label="Lastname"
                prepend-icon="mdi-rename-box"
                required
              ></v-text-field>
              <v-text-field
                v-model="username"
                :counter="20"
                label="Username"
                prepend-icon="mdi-rename-user"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                prepend-icon="mdi-at"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                prepend-icon="mdi-lock"
                type="password"
                label="Password"
                required
              ></v-text-field>

              <v-select
                v-model="position"
                :items="items"
                :rules="[v => !!v || 'Position is required']"
                label="Position"
                required
              ></v-select>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>
            </v-form>
            <center>
              <v-btn color="primary" width="200px" rounded big @click="validate"
                >Login</v-btn
              >
            </center>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { axios } from "@/plugins/axios";
export default {
  name: "Register",
  data() {
    return {
      valid: true,
      username: "",
      fname: "",
      lname: "",
      nameRules: [
        v => !!v || "Name is required",
        v => /^[A-Z a-z]+$/.test(v) || "Name must be valid",
        v => (v && v.length <= 20) || "Name must be less than 10 characters"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Name is required",
        v => /^[A-Za-z]+$/.test(v) || "Name must be valid",
        v => (v && v.length >= 8) || "Password must be more than 8 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      position: null,
      items: ["Secretary", "Teasurer", "Brgy. Captain", "Office on Duty"]
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        var account = {
          account: {
            username: this.username,
            password: this.password
          },
          name: {
            firstname: this.fname,
            lastname: this.lname
          },
          email: this.email,
          position: this.position,
        };
        const url = "http://localhost:4000/admin/register";
        axios
          .post(url, account)
          .then(res => {
            alert(res.data);
            
          })
          .catch(err => {
            console.error("error!");
          });
      }
    }
  }
};
</script>
