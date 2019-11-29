<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      hide-overlay
      fullscreen
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" outlined rounded small  v-on="on">Add Staff</v-btn>
      </template>
      <v-card class="v-card-plain settings">
        <v-toolbar dark color="primary">
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Cancel</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <br>
        <AccountForm
          MyTitle="Add Staff"
          MyButton="Add Staff"
          :MyUpdate="false"
          Default_Password="docxpress.default"
          @accountFormResponse="app_notify"
          :MyDisabled="true"
        />
      </v-card>
    </v-dialog>
  </v-row>
  
</template>
<script>
import AccountForm from "@/pages/admin/components/AccountForm.vue";
export default {
  data() {
    return {
      dialog: false
    };
  },
  components: {
    AccountForm
  },
  methods: {
    app_notify(msg) {
      this.dialog = false;
      this.$emit("register_notif", msg);
    
    }
    
  }
};
</script>
