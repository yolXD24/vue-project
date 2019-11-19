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
            <NavBar />
            <v-card max-width="900" class="col-sm-7 border mx-auto" color="white darken-3" light>
              <br />
              <br />
              <h1 class="text-center">Barangay Clearance</h1>
              <p class="text-center font-italic headline">Office of the Punong Barangay</p>
              <h2 class="text-center">Local Government Code of 1991</h2>
              <div class="flex-grow-1"></div>
              <br />
              <v-card-text>
                <br />
                <v-row justify="space-between">
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
    <Footer />
  </v-app>
</template>
<script>
import NavBar from "@/src/user/components/Navbar";
import Footer from "@/src/user/components/Footer";
import ModalBarangay from "./ModalBarangay";
export default {
  components: {
    NavBar,
    Footer,
    ModalBarangay
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
