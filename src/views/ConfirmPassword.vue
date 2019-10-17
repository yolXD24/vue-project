<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="400" >
      <template v-slot:activator="{ on }">
        <v-btn color="warning" dark v-on="on">Update</v-btn>
      </template>
      <v-card  >
            <v-toolbar class="elevation-1" color="grey lighten-3">
            <v-toolbar-title>Enter Password to Update Account</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
        <v-card-text>
              <br>
          <v-form ref="form" lazy-validation>

           <v-text-field
                    class="purple-input"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    label="Password"
                    required
                     :rules="[v => !!v || 'Password is required']"
                  />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="validate">Confirm Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-row>
  
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      dialog: false,
      snackbar: false,
      timeout: 2000,
      text: "",
      password: ""
    };
  },
  methods: {
    closeDialog(){
      this.dialog = false;
      this.password = ""
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.confirmPass();
      }
    },
    confirmPass() {
      var account = {
        id: jwt_decode(localStorage.getItem("token")).id._id,
        password: this.password
      };
      axios.post("http://localhost:4000/admin/confirm_password",account).then(res => {
            console.log(res)
        if (res.data.confirm) {
          this.$emit("is_confirmed", true);
          this.dialog = false
          // alert("found!")
        } else {
          // alert("not found!")

          this.password = "";
          this.$emit("is_confirmed", false);
        }
      }).catch(err=>{
            console.log(err)
      });
    }
  }
};
</script>