<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="ma-2"
          v-on="on"
        >Edit</v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <RequestForm
          ref="editForm"
          :editMode="true"
          :toBeEdit="ClientInfo"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import RequestForm from "@/pages/user/views/RequestForm";
export default {
  props: {
    ClientInfo: Object
  },
  components: {
    RequestForm
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    };
  }
};
</script>