<template>
  <v-row justify="center">
    <v-dialog
    full-width
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="ma-2"
          v-on="on"
        >Edit</v-btn>
      </template>
      <v-card>
        <!-- <v-toolbar
          dark
          color="primary"
        >
        
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >Save</v-btn>
          </v-toolbar-items>
        </v-toolbar> -->
        <v-card-actions>
          
        <v-spacer>
        </v-spacer>
          <v-btn
            icon
            dark
            color="primary"
            @click="dialog = false"
          >Close
          </v-btn>
        </v-card-actions>

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