<template>
  <v-app>
    <v-flex justify-center>
      <v-img :src="image"
      lazy-src="https://picsum.photos/id/11/10/6"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="auto"
      max-height="1000">
      <v-content>
        <div id="app">
          <NavBar />
          <v-card max-width="900" class="col-sm-7 border mx-auto" color="white darken-3" light>
            <br />
            <br />
            <h1 class="text-center">Barangay Indigency</h1>
            <h2 class="text-center font-italic headline">Office of the Punong Barangay</h2>
            <h2 class="text-center">Required under RA 7160 Sec. 152</h2>
            <div class="flex-grow-1"></div>
            <br />
            <v-card-text>
              <br />
              <Name :name="name"/>
              <v-row>
                <v-col class="px-10" cols="12" sm="6" md="6">
                  <v-text-field v-model="age" type="number" label="Age"></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12" sm="6" md="6">
                  <v-text-field v-model="sex" label="Sex"></v-text-field>
                </v-col>
              </v-row>
              <Address :address="address"/>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <ModalIndigency :name="name" :address="address" :age="age*1" :sex="sex" />
            </v-card-actions>
          </v-card>
        </div>
      </v-content>
      </v-img>
    </v-flex>
    <Footer />
  </v-app>
</template>
<script>
import Name from "../components/Name.vue";
import Address from "../components/Address.vue";
import ModalIndigency from "./ModalIndigency.vue";
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import { isNull } from "util";
export default {
  components: {
    NavBar,
    Footer,
    ModalIndigency,
    Name,
    Address
  },
  data() {
    return {
      image: require("@/user/assets/2.jpg"),
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: ""
      },
      age: 0,
      sex: "",
      address: {
        sitio: "",
        barangay: "",
        municipality: "",
        province: ""
      }
    };
  }
};
</script>
