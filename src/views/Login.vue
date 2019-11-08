<template>
  <v-container
    id="body"
    fluid
  >
    <v-row
      id="content"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="7"
        md="4"
      >
        <center>
          <v-card
            class="mycard pa-md-3 mx-lg-auto"
            :loading="loading"
          >
            <br />
            <center>
              <v-avatar size="100">
                <img
                  position="center"
                  src="@/assets/logo.png"
                  alt="logo"
                />
              </v-avatar>
              <v-card-title
                primary-title
                class="justify-center"
              >
                <div>
                  <div class="blue--text title darken-1--text display-1">
                    Xpress_DocX
                  </div>
                </div>
              </v-card-title>
            </center>
            <v-form ref="form">
              <v-card-text id="card-body">
                <v-text-field
                  label="Username / Email"
                  v-model="credentials.username"
                  :rules="[v=>!!v||'required']"
                  name="login"
                  prepend-icon="mdi-account"
                  clearable
                  @keyup.enter="validate()"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="credentials.password"
                  label="Password"
                  name="password"
                  :rules="[v=>!!v||'required']"
                  prepend-icon="mdi-lock"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  @keyup.enter="validate()"
                ></v-text-field>
                <br />
                <center>
                  <v-btn
                    color="primary"
                    width="200"
                    :disabled="disable"
                    @click="validate"
                    rounded
                  >Login</v-btn>
                </center>
              </v-card-text>
            </v-form>
            <br />
          </v-card>
        </center>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* 
#body {
 position: relative;
  height: 100%!important;
  width: 100% !important;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)) ,url("https://source.unsplash.com/user/cinquantesix");
  background-size: cover !important  ;
  background-position: top center !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  overflow: auto;
} */
.mycard {
  opacity: 0.8 !important;
}
#content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      disable: false,
      credentials: {
        username: "",
        password: ""
      },
      show: false
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.login()
      } else {
        this.$emit("notify", "Fields cannot be empty");
      }
    },
    login() {
      this.$store.dispatch('login', this.credentials)
        .then(res => {
          this.loader(false);
          if (res) {
            console.log(this.$store.state.user);
            this.$emit("notify", "Welcome " + this.$store.state.user.username + " !");
            this.$router.replace("/");
          } else {
            this.$refs.form.reset();
            this.$emit("notify", "Invalid Credentials");
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch('logout')
          this.$emit("notify", "Cannot connect to the server!");
          this.loader(false);
        })

    },
    loader(status) {
      this.loading = status;
      this.disable = status;
    }
  }
};
</script>
