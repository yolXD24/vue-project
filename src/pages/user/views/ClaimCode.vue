<template>
  <center>
    <br/> <br/> <br/>
    <v-card max-width="600" max-height="200">
      <v-system-bar color="blue" dark height="70">
        <v-card-text class="display-1">Welcome to XpressDocx!</v-card-text>
      </v-system-bar>
      <v-img
        class="white--text align-end"
        height="400"
        src="~../assets/samplw.png"
      ></v-img>
      <h2 class="text--primary display-1">Please keep this code: 1234</h2>
      <v-card-text
        class="text--primary"
      >Present this code and the needed requirements upon claiming your document.</v-card-text>
      <center>
        <v-row>
          <v-col class="px-10" sm="6" md="9">
            <v-text-field label="Email" placeholder="Send to Email" outlined></v-text-field>
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
export default {};
</script>