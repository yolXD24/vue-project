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
            "https://i.pinimg.com/564x/c3/38/07/c33807fe6c949c40ee53816669f469e8.jpg",
          name: "Leonilo Torres",
          role: "Front-end Developer"
        },
        {
          src:
            "https://i.pinimg.com/originals/e5/55/83/e55583ef7c6259e3ec6e5da87fb45af2.jpg",
          name: "Lalaine Garrido",
          role: "Front-end Developer"
        },
        {
          src:
            "https://i.pinimg.com/originals/b1/65/93/b165936edaee5b8a6a9736853c39a5f7.jpg",
          name: "Chervin Tanilon",
          role: "Back-end Developer"
        },
        {
          src:
            "https://lh3.googleusercontent.com/ZQXeN_HghHa3xDn8LZSbGvpkw6V4tzDzBHzB2rrknLLAIRhavVqwbgewimHUHPkfnB2JqGFRYqgaXL66pxZHHssd_J6CvIjikw=w1600-rj",
          name: "Renan Bargaso",
          role: "Back-end Developer"
        }
      ]
    };
  }
};
</script>