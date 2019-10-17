<template>
<v-container fluid grid-list-xl>
  <v-card :loading="loading" class="mx-auto my-12 " max-width="400">

    <v-card-text class="text-center">
      <v-avatar  color="primary" size="130">
      <span class="white--text display-3 font-weight-bold text-uppercase">{{credentials.firstname[0] +credentials.lastname[0]}}</span>
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
         <AccountSettings v-if ="confirmed" @click="update" v-on:updated_info="updateInfo"/>   
         <ConfirmPassword v-if ="!confirmed" v-on:is_confirmed="proceed_update" />
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
import ConfirmPassword from "./ConfirmPassword.vue";
export default {
  components:{
    AccountSettings,
    ConfirmPassword
  },
  data() {
    return {
      loading: false,
      credentials:"",
      confirmed:false
    };
  },
  methods: {
    update() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    updateInfo(new_info){
      this.credentials = new_info
    },
    proceed_update(result){
      this.confirmed = result
    }

  },
  created() {
    this.credentials= jwt_decode(localStorage.getItem("token")).id
  }
};
</script>
