<template>
<v-app app id="body">
  <Header v-if="token !== null" />
  <v-content dark id="content">
    <router-view />
    <v-footer padless absolute inset dense>
      <v-col class="text-center" cols="12">
        <v-alert id="v-alert" v-if="is_default_password && token !== null" border="left" colored-border type="error" elevation="2">
          Note : Password must be Changed!
        </v-alert>
      </v-col>
    </v-footer>
  </v-content>


</v-app>
</template>

<style scoped>

</style>

<script>
import Header from "@/components/Menu";
import Login from "@/views/Login";
// import bcrypt from "bcrypt"
import jwt_decode from "jwt-decode";


export default {
  name: "App",
  components: {
    Login,
    Header
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      is_default_password: true
    };
  },
  mounted() {
    this.is_default_password = bcrypt.compareSync('docxpress.default', jwt_decode(this.token).id.password)
    console.log(this.token)

  }
};
</script>
