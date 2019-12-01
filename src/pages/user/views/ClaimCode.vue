<template>
  <center>
    <br/> <br/> <br/>
    <v-card max-width="600" max-height="700">
      <v-system-bar color="blue" dark height="70">
        <v-card-text class="display-1">Welcome to XpressDocx!</v-card-text>
      </v-system-bar>
      <v-img
        class="white--text align-end"
        height="400"
        width="400"
        src="~../assets/samplw.png"
      ></v-img>
      <h2 class="text--primary display-1">Please keep this code: {{$route.params.code}}</h2>
      <v-card-text
        class="text--primary"
      >Present this code and the needed requirements upon claiming your document.</v-card-text>
      <center>
        <v-row align="start"
              justify="center">
          <v-col class="px-10" sm="6" md="8">
            <v-text-field label="Email" v-model="email" placeholder="Send to Email" outlined></v-text-field>
          </v-col>
          <v-col class="px-10" sm="6">
            <v-btn color="primary" rounded outlined>Send</v-btn>
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
      email: ""
    }
  },
  methods:{
    send() {
      axios
        .post("localhost:4000/user/success/email-notification", {
          code: this.$route.params.code,
          email: this.email
        })
        .then(response =>
          console.log("Sent to yuor email! Thank you.")
        );
    }
  },
};
</script>