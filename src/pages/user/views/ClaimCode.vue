<template>
  <center>
    <br/> <br/> <br/>
    <v-card max-width="600" max-height="700">
      <v-system-bar color="blue" dark height="70">
        <v-card-text class="display-1">Welcome to XpressDocx!</v-card-text>
      </v-system-bar>
      <v-img
        class="white--text align-end"
        height="300"
        src="~../assets/samplw.png"
      ></v-img>
      <h2 class="text--primary display-1">Please keep this code: {{code}}</h2>
      <v-card-text
        class="text--primary"
      >Present this code and the needed requirements upon claiming your document.</v-card-text>
      <center>
        <v-row>
          <v-col class="px-10" sm="6" md="9">
            <v-text-field label="Email" v-model="email" placeholder="Send to Email" outlined></v-text-field>
          </v-col>
          <v-col class="px-20">
            <v-btn>Send</v-btn>
          </v-col>
        </v-row>
      </center>
      <v-system-bar color="blue" dark height="70">
        <v-card-text class="display-0">Thank you for using XpressDocx.</v-card-text>
      </v-system-bar>
    </v-card>
  </center>
</template>
<script>
import axios from "axios";
export default {
  data(){
    return{
      code: "",
      email: ""
    }
  },
  methods:{
    send() {
      this.$axios
        .post("localhost:4000/user/" + $route.params.type, {
          code: this.code,
          email: this.email
        })
        .then(response => (alert("sent!")));
    }
  }
};
</script>