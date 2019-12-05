<template>
  <center>
    <br>
    <br>
    <v-card
      max-width="600"
    >
      <v-system-bar
        color="blue darken-2"
        dark
        height="70"
      >
        <v-card-text class="display-1">Welcome to XpressDocx!</v-card-text>
      </v-system-bar>
      <v-img
        class="white--text align-end"
        height="400"
        width="400"
        src="~../assets/samplw.png"
      ></v-img>
      <h2 class="text--primary display-1">Please keep this code: {{$route.params.code}}</h2>
      <v-card-text class="text--primary">Present this code and the needed requirements upon claiming your document.</v-card-text>
      <v-row
        justify="center"
      >
        <v-col
          md="6"
          sm="7"
        >
          <v-text-field
            label="Email"
            v-model="email"
            placeholder="Send to Email"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="ma-5">
        <v-btn
          @click="send"
          color="primary"
          width="300"
          outlined
          class="ma-2"
        >Send</v-btn>
        <br>
         <v-btn
          @click="$router.push('/')"
          color="primary"
          class="ma-2"
          width="300"
          outlined
        >Back</v-btn>
        <br><br>
      </div>
     
      <v-system-bar
        color="blue darken-2"
        dark
        height="70"
      >
        <v-card-text class="display-0">Thank you for using XpressDocx.</v-card-text>
      </v-system-bar>
    </v-card>
    <Snackbar ref="snackbar" />
  </center>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: ""
    };
  },
  components: {
    Snackbar: () => import('../components/Snackbar')
  },
  methods: {
    send() {
      axios
        .post(`${this.$urls.user_online_api}/success/email-notification`, {
          code: this.$route.params.code,
          email: this.email
        })
        .then(response => {
          this.notify("Sent");

        })
        .catch(error => {
          this.notify("Send failed!");
        });
    },
    notify(message) {
      this.$refs.snackbar.snackbar = true;
      this.$refs.snackbar.text = message;
    }
  }
};
</script>