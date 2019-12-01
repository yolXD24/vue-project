<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="ma-2"
          color="primary"
          rounded
          large
          width="300"
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

   
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    ClientInfo: Object
  },
  components: {
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