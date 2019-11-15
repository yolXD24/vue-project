<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="11">
        <v-card
          title="Edit Profile"
          text="Complete your profile"
          class="elevation-4"
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
                    :rules="[rules.required ,rules.max,rules.usernameRules]"
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
                    :rules="[rules.required,rules.emailRules]"
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
                    :rules="[rules.required,rules.nameRules]"
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
                    :rules="[rules.required,rules.nameRules]"
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
                    :rules="[rules.required,rules.passwordRules , rules.min , rules.matchPassword]"
                    prepend-icon="mdi-lock"
                    :type="password_type"
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
                    :rules="[rules.required,rules.passwordRules , rules.min , rules.matchPassword]"
                    prepend-icon="mdi-lock"
                    type="password"
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
                    :rules="[rules.required]"
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
      timeout: 2000,
      url: "http://localhost:4000/admin/",
      rules: {
        required: value => !!value || "Required.",
        usernameRules: v => (v && v.length <= 10) || "Name must be less than 10 characters",
        min: v => (v && v.length >= 8) || "Min 8 characters",
        max: v => (v && v.length <= 20) || "Name must be less than 20 characters",
        nameRules: v => /^[A-Z a-z]+$/.test(v) || "Name must be valid",
        emailRules: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
        passwordRules: v => (v && v.length >= 8) || "Password must be more than 8 characters",
        matchPassword: () => this.account.password === this.c_password || "Passwords don't match !"
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
            this.register(this.account, this.url + "register");
          } else {
            this.account.password = "";
            this.c_password = "";
            this.account.id = this.Info._id;
            this.update(this.account, this.url + "update");
          }
        } else {
          this.$emit("accountFormResponse", "Passwords don't match!");
          this.c_password = null;
        }
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
              "Username / Email is already taken!"
            );
          }
        })
        .catch(err => {
          console.log(err);
          this.$emit(
            "accountFormResponse",
            "Unable to connect to the server!"
          );
        });
    },
    update(account, _url) {
      axios
        .post(_url, account)
        .then(res => {
          const response = res.data.data
          localStorage.setItem("default", response.body.default_pass);
          this.$store.commit('setToken', response.body.accessToken);
          this.$store.commit('setUser');
          this.$emit(
            "accountFormResponse",
            response.message
          );
          setTimeout(() => {
            this.$emit(
              "updated_response"
            );
          }, 1200);
        })
        .catch(err => {
          console.log(err.response.data);
          this.$emit("accountFormResponse", error.response.data.message);
        });
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
