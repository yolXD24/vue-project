<template>
  <v-container
    fluid
    class="body"
    grid-list-xl
  >
    <v-card
      :loading="loading"
      class="mx-auto my-12 v-card"
      max-width="500"
      elevation="5"
    >
      <br />
      <v-card-text class="text-center">
        <v-avatar
          :color="colors[Math.floor(Math.random() * this.colors.length)]"
          size="150"
        >
          <span class="white--text display-3 font-weight-bold text-uppercase">
            {{ credentials.firstname[0] + credentials.lastname[0] }}
          </span>
        </v-avatar>
        <v-row
          align="center"
          class="mx-5"
        >
          <v-card-text class="black--text text--accent-4">
            <h4 class="headline font-weight-black text-uppercase">
              Name : {{ credentials.firstname + " " + credentials.lastname }}
            </h4>
            <br />
            <div class="font-weight-medium title mb-3">
              <h5>Username : {{ credentials.username }}</h5>
              <h5>Email : {{ credentials.email }}</h5>
              <h5 class="text-capitalize">
                position : {{ credentials.position }}
              </h5>
            </div>
            <center>
              <br />
              <AccountSettings
                id="plain"
                v-if="confirmed"
                @click="update"
                v-on:accountFormResponse="accountFormResponsetoApp"
              />
              <ConfirmPassword
                v-if="!confirmed"
                v-on:is_confirmed="confirm_password"
                v-on:is_error="confirm_password_error"
              />
            </center>
          </v-card-text>
        </v-row>
      </v-card-text>
      <br />
      <br />
    </v-card>
  </v-container>
</template>

<script>
import jwt_decode from "jwt-decode";
import AccountSettings from "./AccountSettings.vue";
import ConfirmPassword from "./ConfirmPassword.vue";
import { isNullOrUndefined } from "util";
export default {

  components: {
    AccountSettings,
    ConfirmPassword
  },
  data() {
    return {
      colors: [
        "primary",
        "secondary",
        "#FF8A80",
        "#4A148C",
        "#FF80AB",
        "#7986CB",
        "#4FC3F7",
        "#F57F17",
        "#78909C",
        "#BF360C",
        "#00796B",
        "#FF4081"
      ],
      loading: false,
      confirmed: false,
      credentials: this.$store.getters.user
    }
  },
  methods: {
    update() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    confirm_password(resp) {      
      this.myNotify("Profile update is now available!");
      this.confirmed = resp;
    },
    confirm_password_error(err) {
      this.myNotify(err);
    },
    accountFormResponsetoApp(message) {
      this.myNotify(message);
    },
    myNotify(message) {
      this.$emit("notify", message);
    }
  },
};
</script>
