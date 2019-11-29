<template>
  <v-container fluid>
    <v-row
      justify="center"
      style="background:transparent;box-shadow:none!important"
      class="elevation-0"
    >
      <v-col
        cols="10"
        style="background:transparent;box-shadow:none!important"
      >
        <v-card
          title="Edit Profile"
          text="Complete your profile"
          class="elevation-4 "
        >
          <v-toolbar
            class="elevation-1"
            color="grey lighten-3"
          >
            <v-toolbar-title>{{ MyTitle }}</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="px-10"
          >
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="14"
                  md="6"
                >
                  <v-text-field
                    class="purple-input"
                    v-model="account.username"
                    :counter="10"
                    :rules="[$rules.required ,$rules.max,$rules.usernameRules]"
                    label="Username"
                    hint="usernames are unique..."
                    prepend-icon="mdi-chart-bubble"
                    required
                  />
                </v-col>

                <v-col
                  cols="14"
                  md="6"
                >
                  <v-text-field
                    label="Email Address"
                    hint="emails are unique..."
                    class="purple-input"
                    v-model="account.email"
                    :rules="[$rules.required,$rules.emailRules]"
                    prepend-icon="mdi-at"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                    hint="numbers and symbols are not allowed!"
                    placeholder="Default upon selecting position"
                    v-model="account.fname"
                    :counter="20"
                    :disabled="input_disable"
                    :rules="[$rules.required,$rules.nameRules]"
                    prepend-icon="mdi-rename-box"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="account.lname"
                    :disabled="input_disable"
                    placeholder="Default upon selecting position"
                    hint="numbers and symbols are not allowed!"
                    :counter="20"
                    :rules="[$rules.required,$rules.nameRules]"
                    label="Lastname"
                    prepend-icon="mdi-rename-box"
                    required
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="14"
                  md="6"
                >
                  <v-text-field
                    class="purple-input"
                    v-model="account.password"
                    placeholder="Password should be greater than 8 characters"
                    :rules="[$rules.required,$rules.passwordRules , $rules.min ]"
                    prepend-icon="mdi-lock"
                    :type="visibility.show ? 'text' : 'password'"
                    :append-icon="visibility.show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="visibility.show = !visibility.show"
                    label="Password"
                    :disabled="MyDisabled"
                    required
                  />
                </v-col>

                <v-col
                  cols="14"
                  md="6"
                >
                  <v-text-field
                    v-model="c_password"
                    :rules="[$rules.required,$rules.passwordRules , $rules.min , rules.matchPassword]"
                    :type="visibility.show1 ? 'text' : 'password'"
                    :append-icon="visibility.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="visibility.show1 = !visibility.show1"
                    prepend-icon="mdi-lock"
                    label=" Confirm Password"
                    required
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    @change="checkName"
                    v-model="account.position"
                    :items="positions"
                    :disabled="!MyDisabled"
                    prepend-icon="mdi-account-child-outline "
                    :rules="[$rules.required]"
                    label="Position"
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  class="text-center"
                >
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
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
    >
      {{ text }}
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import nameCheckandAssign from "@/helpers/nameCheckandAssign";
import { register, update } from "@/system/functions/request";
export default {
  name: "AccountForm",
  props: {
    MyTitle: String,
    MyButton: String,
    MyDisabled: Boolean,
    MyUpdate: Boolean,
    Default_Password: String
  },
  data() {
    return {
      valid: true,
      account: {
        username: "",
        fname: "",
        lname: "",
        email: "",
        admin: false,
        password: this.Default_Password,
        position: this.Info ? this.Info.position : null,
      },
      isDisable: false,
      input_disable: true,
      text: "",
      snackbar: false,
      c_password: "",
      visibility: { show: this.MyDisabled ? true : false, show1: false },
      timeout: 2000,
      url: "http://localhost:4000/admin/",
      rules: {
        matchPassword: (a, b) => this.account.password === this.c_password || "Passwords don't match !"
      },
      positions: ["Secretary", "Teasurer", "Brgy. Captain", "Office on Duty"]
    };
  },
  computed: {
    password_type() {
      return this.MyUpdate ? "password" : "text";
    },
    Info() {
      return this.$store.getters.user
    }
  },
  methods: {
    checkName() {
      var details = nameCheckandAssign.checkName(this.account.position)
      this.input_disable = details.disable;
      this.account.fname = details.account[0];
      this.account.lname = details.account[1];
    },
    validate() {
      this.isDisable = true;
      setTimeout(() => {
        this.isDisable = false;
      }, 800);
      if (this.$refs.form.validate()) {
        if (this.account.password === this.c_password) {
          if (!this.MyUpdate) {
            register(this.account, this.url + "register").then(res => {
              this.registerHandler(res)
            }).catch(err => {
              this.resetForm();

              this.$emit(
                "accountFormResponse",
                err.message
              );
            });
          } else {
            this.account.id = this.Info._id;
            update(this.account, this.url + "update").then(res => {
              this.updateHandler(res)
            }).catch(error => {
              this.resetForm();

              this.$emit("accountFormResponse", error.message);
            });
          }
        } else {
          this.$emit("accountFormResponse", "Passwords don't match!");
          this.c_password = "";
        }
      }
    },
    registerHandler(res) {
      if (!res.body.exist) {
        this.$emit("accountFormResponse", res.message);
        this.$emit(
          "accountFormResponse",
          res
        );

        this.resetForm();
        // setTimeout(() => {
        //   location.reload(true);
        // }, 1000);
      } else {
        this.$emit(
          "accountFormResponse",
          "Username / Email is already taken!"
        );

        this.resetForm();
      }
    },
    updateHandler(res) {
      this.clearFields()
      this.$store.commit('setDefault', res.body.default_pass)
      this.$store.commit('setToken', res.body.accessToken);
      this.$store.commit('setUser');
      this.$emit(
        "accountFormResponse",
        res.message
      );
      setTimeout(() => { this.$emit("updated_response") }, 1000);
      this.resetForm();
    },
    resetForm() {
      this.account = {
        username: "",
        fname: "",
        lname: "",
        email: "",
        admin: false,
        password: this.Default_Password,
        position: this.Info ? this.Info.position : null,
      }
      c_password= ""

    },
    checkUpdate() {
      if (this.MyUpdate) {
        this.account = this.Info;
        this.account.fname = this.Info.firstname;
        this.account.lname = this.Info.lastname
        this.account.password = null
      }
    },
    clearFields() {
      this.account.password = "";
      this.c_password = "";
    }
  },
  mounted() {
    this.checkUpdate();
  }
};
</script>
