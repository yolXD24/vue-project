<template>
  <v-row justify="center">
      <v-dialog v-model="dialog" width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">About</v-btn>
      </template>
      <v-container>
        <center>
          <v-row>
            <v-col v-for="(item, i) in items" :key="i">
              <v-layout>
                
                  <v-card height="320" width="210" class="v-card-profile">
                    <img height="210" width="210" :src="item.src"/>
                    <v-card-text class="text-xs-center">
                      <h2 class="card-title font-weight-light">{{item.name}}</h2><br/>
                      <h3 class="category mb-3">{{item.role}}</h3>
                    </v-card-text>
                  </v-card>
              </v-layout>
            </v-col>
          </v-row>
        </center>
      </v-container>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      items: [
        {
          src:
            require('../assets/leonilo.jpg'),
          name: "Leonilo Torres",
          role: "Front-end Developer"
        },
        {
          src:
             require('../assets/lalaine.jpg'),
          name: "Lalaine Garrido",
          role: "Front-end Developer"
        },
        {
          src:
             require('../assets/chervin.jpg'),
          name: "Chervin Tanilon",
          role: "Back-end Developer"
        },
        {
          src:
             require('../assets/renan.jpg'),
          name: "Renan Bargaso",
          role: "Back-end Developer"
        }
      ]
    };
  }
};
</script>