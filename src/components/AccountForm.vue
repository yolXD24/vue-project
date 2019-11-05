<template>
  <v-container fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="11">
        <v-card title="Edit Profile" text="Complete your profile" class="elevation-4">
          <v-toolbar class="elevation-1" color="grey lighten-3">
            <v-toolbar-title>{{ MyTitle }}</v-toolbar-title>
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
                    @keyup.enter="login"
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
                    @keyup.enter="login"
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
                    :disabled="intput_disable"
                    @keyup.enter="login"
                    :rules="nameRules"
                    prepend-icon="mdi-rename-box"
                    required
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="lname"
                    :disabled="intput_disable"
                    :counter="20"
                    @keyup.enter="login"
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
                    @keyup.enter="login"
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
                    @keyup.enter="login"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    @change="checkName"
                    v-model="position"
                    :items="items"
                    :disabled="!MyDisabled"
                    prepend-icon="mdi-account-child-outline "
                    :rules="[v => !!v || 'Position is required']"
                    label="Position"
                    required
                    @keyup.enter="login"
                  ></v-select>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn
                    color="primary"
                    large
                    width="200"
                    class="white--text text--accent-5"
                    :disabled="isDisable"
                    rounded
                    @click="validate()"
                  >{{ MyButton }}</v-btn>
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
      intput_disable: true,
      username: "",
      fname: "",
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
      position: this.Info ? this.Info.position : null,
      items: ["Secretary", "Teasurer", "Brgy. Captain", "Office on Duty"]
    };
  },
  computed: {
    password_type() {
      return this.MyUpdate ? "password" : "text";
    }
  },
  methods: {
    checkName() {
      switch (this.position) {
        case this.items[0]:
          this.intput_disable = true;
          this.fname = "Chervin";
          this.lname = "Tanilon";
          break;
        case this.items[1]:
          this.fname = "Renan";
          this.lname = "Bargaso";
          this.intput_disable = true;
          break;
        case this.items[2]:
          this.intput_disable = true;
          this.fname = "Yol Jr";
          this.lname = "Torres";
          break;
        case this.items[3]:
          this.intput_disable = false;
        default:
          break;
      }
    },
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
            this.password = "";
            this.c_password = "";
            account.id = this.Info._id;
            this.update(account, this.url + "update");
          }
        } else {
          this.$emit("accountFormResponse", "Passwords don't match!");
          this.c_password = null;
        }
      } else {
        this.$emit("accountFormResponse", "Invalid account settings!");
      }
    },

    register(account, _url) {
      axios
        .post(_url, account)
        .then(res => {
          if (!res.data.exist) {
            this.$emit("accountFormResponse", "Account Saved Successfully!");
            setTimeout(() => {
              this.$router.push("/admin/AccountManagement");
            }, 1000);
          } else {
            this.$emit(
              "accountFormResponse",
              "Username / Email is not available!"
            );
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
          this.$emit(
            "accountFormResponse",
            "Account was Updated Successfully!"
          );
          setTimeout(() => {
            this.$emit(
              "updated_response",
              jwt_decode(localStorage.getItem("token")).id
            );
          }, 1200);
        })
        .catch(err => {
          this.$emit("accountFormResponse", "Something went wrong!");
        });
    },
    clearFields() {
      this.password = "";
      this.c_password = "";
    }
  },
  mounted() {
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
