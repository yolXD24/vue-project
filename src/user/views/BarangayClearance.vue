<template>
  <v-app>
    <v-flex justify-center>
      <v-img
        :src="image"
        lazy-src="https://picsum.photos/id/11/10/6"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="auto"
        max-height="1100"
      >
        <v-content>
          <div id="app">
            <NavBar/>
            <v-card max-width="900" class="col-sm-7 border mx-auto" color="white darken-3" light>
              <br>
              <br>
              <h1 class="text-center">Barangay Clearance</h1>
              <p class="text-center font-italic headline">Office of the Punong Barangay</p>
              <h2 class="text-center">Local Government Code of 1991</h2>
              <div class="flex-grow-1"></div>
              <br>
              <v-card-text>
                <br>
                <Name :name="name"/>
                <v-row justify="space-between">
                  <v-col class="px-10" cols="12" sm="6" md="6">
                    <v-text-field v-model="citizenship" label="Citizenship"></v-text-field>
                  </v-col>
                  <v-col class="px-10" cols="12" sm="6" md="6">
                    <v-text-field v-model="age" type="number" label="Age"></v-text-field>
                  </v-col>
                  <v-col class="px-10" cols="12" sm="6" md="6">
                    <v-text-field v-model="sex" label="Sex"></v-text-field>
                  </v-col>
                  <v-col class="px-10" cols="12" sm="6" md="6">
                    <v-text-field v-model="status" label="Civil Status"></v-text-field>
                  </v-col>
                </v-row>
                <Address :address="address"/>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <ModalBarangay
                  :name="name"
                  :status="status"
                  :citizenship="citizenship"
                  :age="age*1"
                  :sex="sex"
                  :address="address"
                />
              </v-card-actions>
            </v-card>
          </div>
        </v-content>
      </v-img>
    </v-flex>
    <Footer/>
  </v-app>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import Name from "../components/Name.vue";
import Address from "../components/Address.vue";
import ModalBarangay from "./ModalBarangay.vue";
export default {
  components: {
    NavBar,
    Footer,
    ModalBarangay,
    Name,
    Address
  },
  data() {
    return {
      image: require("@/user/assets/1.jpg"),
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: ""
      },
      citizenship: "",
      age: 0,
      sex: "",
      status: "",
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
