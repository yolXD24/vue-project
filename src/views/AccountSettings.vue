<template>
  <v-row justify="center">
    <v-dialog
      id="plain"
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          class="white--text text--accent-5"
          rounded
          with="500"
          dark
          v-on="on"
        >Update Settings</v-btn>
      </template>
      <!-- style='{background: url("https://source.unsplash.com/collections/8825242/' + random + '"})' -->
      <v-card class="v-card-plain settings">
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>Account Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >Cancel</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <AccountForm
          v-on:updated_response="closeDialog"
          v-on:accountFormResponse="accountFormResponse1"
          ref="form"
          MyTitle="Update Account"
          MyButton="Update"
          :MyUpdate="true"
          :MyDisabled="false"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import AccountForm from "@/components/AccountForm.vue";

export default {
  components: {
    AccountForm
  },

  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      random: 1,
      widgets: false
    };
  },
  methods: {
    closeDialog() {
        this.dialog = false;
    },
    accountFormResponse1(message) {
      this.closeDialog();
      this.$emit("accountFormResponse", message);
    }
  }
};
</script>
