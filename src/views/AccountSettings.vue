<template>
  <v-row justify="center" >
    <v-dialog  v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class=" white--text text--accent-5" rounded with="500" dark v-on="on">Update Settings</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Account Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn  dark text @click="dialog= false">Cancel</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <AccountForm v-on:updated_response="closeDialog" ref="form" MyTitle= "Update Account" MyButton= "Update" Default_Password="" :MyUpdate="true" :Info="userInfo"  :MyDisabled="false" />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import AccountForm from "@/components/AccountForm.vue";
import jwt_decode from "jwt-decode";

export default {
  components: {
    AccountForm
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      userInfo: jwt_decode(localStorage.getItem("token")).id
    };
  },
  methods: {
    closeDialog(info) {
      if (info === false || info ) {
        this.userInfo = jwt_decode(localStorage.getItem("token")).id;
        this.$emit("updated_info", this.userInfo);
        this.userInfo = info;
        this.dialog = false;
        this.$refs.form.clearFields();
      }
    }
  }
};
</script>