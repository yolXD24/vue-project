<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          rounded
          width="200"
          large
          dark
          v-on="on"
        >Update</v-btn>
      </template>
      <v-card
        class="v-card-plain"
        @keyup.esc="closeDialog"
      >
        <v-toolbar
          class="elevation-1"
          color="grey lighten-3"
        >
          <v-toolbar-title>Enter Password to Update Account</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
          <br />
          <div
            ref="form"
            lazy-validation
          >
            <v-text-field
              class="purple-input"
              v-model="password"
              prepend-icon="mdi-lock"
              type="password"
              label="Password"
              @keyup.enter="validate"
              required
              :rules="[v => !!v || 'Password is required']"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="closeDialog"
          >Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="validate"
          >Confirm Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      text: "",
      password: "",
      my_ref: "form"
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.password = "";
    },
    validate() {
      var account = {
        id: this.$store.getters.user._id,
        password: this.password
      };
      this.$store.dispatch('confirmPass', account).then(valid => {
        this.$emit("is_confirmed", true);
      }).catch(err => {
        this.password = "";
        this.$emit("is_error", err);
      });
    }
  }
};
</script>
