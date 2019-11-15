<template>
  <v-app
    app
    id="body"
    :style="'background :linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('+background+')'"
  >
    <!--  url('https://source.unsplash.com/user/cinquantesix') -->
    <Sidebar v-if="$store.state.status" />
    <v-content
      dark
      id="content"
    >
      <router-view v-on:notify="app_notify" />
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        absolute
      >
        {{ text }}
        <v-btn
          color="blue"
          text
          @click="snackbar = false"
        >Close</v-btn>
      </v-snackbar>
      <v-footer
        padless
        absolute
        inset
        dense
        style="background=transparent!"
      >
        <v-col
          class="text-center"
          cols="12"
          v-if="is_default_password === 'true' && $store.getters.token !== null"
        >
          <v-alert
            id="v-alert"
            border="left"
            colored-border
            type="error"
            elevation="2"
          >Note : Password must be Changed!</v-alert>
        </v-col>
      </v-footer>
    </v-content>
  </v-app>
</template>
<script>
/* eslint-disable */
import Sidebar from "@/components/Sidebar";
import verifyToken from "./helpers/verifyToken";
import { isNull } from "util";

export default {
  name: "App",
  components: {
    Sidebar
  },
  data() {
    return {
      snackbar: false,
      background: "",
      testbg: "",
      text: "",
      timeout: 2000,
    };
  },
  computed: {
    is_default_password() {
      return this.$store.getters.defaultPassword;
    }
  },
  methods: {
    app_notify(notification) {
      this.text = notification;
      this.snackbar = true;
    },
    checkLogin() {
      verifyToken.VerifyToken().then(valid => {
        if (!valid) {
          this.app_notify("Session Expired")
          this.$store.commit('logout');
          this.$router.push("/login")
        }
      }).catch(err => {
        this.$store.commit('logout');
        this.$router.push("/login")
        this.app_notify("Session Expired")
      })

    }
  },

  mounted() {
    // if (!isNull(this.$store.state.status)) {
    //   this.checkLogin();
    // }
    this.$store.state.axios.get("https://source.unsplash.com/user/cinquantesix").then(res => {
      this.background = res.request.responseURL
    }).catch(err => {
      this.app_notify("Failed to load some images...")
      this.background = "@/assets/bg.jpg"
    })
  }

};
</script>
