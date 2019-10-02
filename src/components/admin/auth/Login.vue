<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 offset-xs4>
        <v-card elevation-24 style="padding: 20px; border: 1px;">
          <v-card-text>
            <h6 class="display-1 text-center font-weight-regular">Login</h6>
            <v-form>
              <br />
              <v-text-field
                clearable
                v-model="username"
                label="Username"
                prepend-icon="mdi-account"
                type="text"
                color="secondary"
              ></v-text-field>
              <v-text-field
                clearable
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                color="secondary"
              ></v-text-field>
            </v-form>
            <center>
              <v-btn color="success" width="200px" rounded big @click="login()">Login</v-btn>
            </center>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
    //   console.warn("username : ", this.username);
    //   console.warn("password : ", this.username);
      console.warn("username : ", this.$parent.mockAccount.username);
      console.warn("password : ", this.$parent.mockAccount.password);
      if (this.username != "" && this.password != "") {
        if (
          this.username == this.$parent.username &&
          this.password == this.$parent.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "home" }).catch(err => {
            console.log(err)
          });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>
