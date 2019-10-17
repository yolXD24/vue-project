<template>
  <v-container fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="11">
        <v-card title="Edit Profile" text="Complete your profile" class="elevation-4">
          <v-toolbar class="elevation-1" color="grey lighten-3">
            <v-toolbar-title>{{MyTitle}}</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="py-0">
              <v-row>
                <v-col cols="14" md="6">
                  <v-text-field
                    class="purple-input"
                    v-model="username"
                    :counter="10"
                    :rules="usernameRules"
                    label="Username"
                    prepend-icon="mdi-chart-bubble"
                    required
                  />
                </v-col>

                <v-col cols="14" md="6">
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    v-model="email"
                    :rules="emailRules"
                    prepend-icon="mdi-at"
                    required
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                    v-model="fname"
                    :counter="20"
                    :rules="nameRules"
                    prepend-icon="mdi-rename-box"
                    required
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="lname"
                    :counter="20"
                    :rules="nameRules"
                    label="Lastname"
                    prepend-icon="mdi-rename-box"
                    required
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="14" md="6">
                  <v-text-field
                    class="purple-input"
                    v-model="password"
                    :rules="passwordRules"
                    prepend-icon="mdi-lock"
                    :type="password_type"
                    label="Password"
                    :disabled="MyDisabled"
                    required
                  />
                </v-col>

                <v-col cols="14" md="6">
                  <v-text-field
                    v-model="c_password"
                    :rules="passwordRules"
                    prepend-icon="mdi-lock"
                    type="password"
                    label=" Confirm Password"
                    required
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="position"
                    :items="items"
                    prepend-icon="mdi-account-child-outline "
                    :rules="[v => !!v || 'Position is required']"
                    label="Position"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn color="primary" large width="200" class=" white--text text--accent-5" :disabled="isDisable" rounded @click="validate()">{{MyButton}} </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <br />
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
      {{ text }}
      
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "AccountForm",
  props: {
    MyTitle: String,
    MyButton: String,
    MyDisabled: Boolean,
    MyUpdate: Boolean,
    Default_Password: String,
    Info: Object
  },
  data() {
    return {
      valid: true,
      isDisable: false,
      username: "",
      fname: "",
      password_type: "text",
      text: "",
      snackbar: false,
      timeout: 2000,
      c_password: "",
      lname: "",
      url: "http://localhost:4000/admin/",
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => /^[A-Z a-z]+$/.test(v) || "Name must be valid",
        v => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      password: this.Default_Password,
      passwordRules: [
        v => !!v || "Password is required",
        v => /^[A-Z a-z0-9.]+$/.test(v) || "Password must be valid",
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
      this.isDisable = true;
      setTimeout(() => {
        this.isDisable = false;
      }, 800);
      if (this.$refs.form.validate()) {
        if (this.password === this.c_password) {
          var account = {
            username: this.username,
            firstname: this.fname,
            lastname: this.lname,
            email: this.email,
            position: this.position,
            admin: false,
            password: this.password
          };
          if (!this.MyUpdate) {
            this.register(account, this.url + "register");
          } else {
            this.password_type = "password";
            this.password = "";
            this.c_password = "";
            account.id = this.Info._id;
            this.update(account, this.url + "update");
          }
        } else {
          this.text = "Passwords don't match!";
          this.snackbar = true;
          this.c_password = null;
        }
      } else {
        this.text = "Invalid account settings!";
        this.snackbar = true;
      }
    },
    register(account, _url) {
      console.log(_url);
      axios
        .post(_url, account)
        .then(res => {
          if (!res.data.exist) {
            this.text = "Account Saved Successfully!";
            this.snackbar = true;
            // location.reload(true)
            setTimeout(() => {
              this.$router.push("/admin/AccountManagement");
            }, 1000);
          } else {
            this.text = "Username / Email is not available!";
            this.snackbar = true;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    update(account, _url) {
      axios
        .post(_url, account)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("default", res.data.default_pass);
          this.text = "Account was Updated Success fully!";
          this.snackbar = true;
          setTimeout(() => {
            this.$emit(
              "updated_response",
              jwt_decode(localStorage.getItem("token")).id
            );
          }, 1200);
        })
        .catch(err => {
          this.text = "Something went wrong!";
          this.snackbar = true;
        });
    },
    clearFields() {
      this.password = "";
      this.c_password = "";
    }
  },
  mounted() {
    if (this.MyUpdate) {
      this.password_type = "password";
    }
    if (this.Info) {
      this.username = this.Info.username;
      this.fname = this.Info.firstname;
      this.lname = this.Info.lastname;
      this.position = this.Info.position;
      this.email = this.Info.email;
    }
  }
};
</script>
