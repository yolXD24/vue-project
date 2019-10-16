<template>
<v-container fluid grid-list-xl>
  <v-card :loading="loading" class="mx-auto my-12 " max-width="400">

    <v-card-text class="text-center">
      <v-avatar  color="primary" size="130">
      <span class="white--text display-3 font-weight-bold">{{credentials.firstname[0] +credentials.lastname[0]}}</span>
    </v-avatar>
      <v-row align="center" class="mx-5" >
        <v-card-text class="black--text text--accent-4">
          <h4 class=" title text-uppercase">
            Name : {{credentials.firstname +" " +credentials.lastname}}
          </h4>
          <br>
          <h6 class="subtitle-2  mb-3 ">
            Username : {{credentials.username}}
          </h6>
          <h6 class="subtitle-2  mb-3">
            Email : {{credentials.email}}
          </h6>
          <h6 class="subtitle-2  mb-3 text-capitalize">
            position : {{credentials.position}}
          </h6>
          <center>
         <AccountSettings/>   
          </center>
        </v-card-text>
      </v-row>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
import jwt_decode from "jwt-decode";
import AccountSettings from "./AccountSettings.vue";
export default {
  components:{
    AccountSettings
  },
  data() {
    return {
      loading: false,
      credentials: jwt_decode(localStorage.getItem("token")).id
    };
  },
  methods: {
    update() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    }
  },
  mounted() {}
};
</script>
