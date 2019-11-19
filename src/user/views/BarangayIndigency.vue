<template>
  <div>
    <v-flex justify-center>
      <v-img :src="image"
      lazy-src="https://picsum.photos/id/11/10/6"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="auto"
      max-height="1000">
      <v-content>
        <div id="app">
          <v-card max-width="900" class="col-sm-7 border mx-auto" color="white darken-3" light>
            <br />
            <br />
            <h1 class="text-center">Barangay Indigency</h1>
            <h2 class="text-center">Office of the Punong Barangay</h2>
            <h2 class="text-center">Required under RA 7160 Sec. 152</h2>
            <div class="flex-grow-1"></div>
            <br />
            <v-card-text>
              <br />
              <v-row>
                <v-col class="px-10" cols="12" sm="6" md="6">
                  <v-text-field v-model="name.firstName" label="First Name"></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12" sm="6" md="6">
                  <v-text-field v-model="name.middleName" label="Middle Name"></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12" sm="6" md="6">
                  <v-text-field v-model="name.lastName" label="Last Name"></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12" sm="6" md="6">
                  <v-text-field v-model="name.suffix" label="Suffix"></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12" sm="6" md="6">
                  <v-text-field v-model="age" type="number" label="Age"></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12" sm="6" md="6">
                  <v-text-field v-model="sex" label="Sex"></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12" sm="6" md="6">
                    <v-text-field v-model="address.sitio" label="Sitio"></v-text-field>
                  </v-col>
                  <v-col class="px-10" cols="12" sm="6" md="6">
                    <v-text-field v-model="address.barangay" label="Barangay"></v-text-field>
                  </v-col>
                  <v-col class="px-10" cols="12" sm="6" md="6">
                    <v-text-field v-model="address.municipality" label="Municipality"></v-text-field>
                  </v-col>
                  <v-col class="px-10" cols="12" sm="6" md="6">
                    <v-text-field v-model="address.province" label="Province"></v-text-field>
                  </v-col>
              </v-row>
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
  </div>
</template>
<script>
import ModalIndigency from "./ModalIndigency";
import NavBar from "@/user/components/NavBar";
import Footer from "@/user/components/Footer";
// import { isNull } from "util";
export default {
  components: {
    NavBar,
    Footer,
    ModalIndigency
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
