<template>
  <div>
    <v-dialog  width="900">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="white" fab large>Preview</v-btn>
      </template>
      <v-card max-width="900" class="col-sm-7 border mx-auto">
        <br />
        <center>
          <img height="200" width="200" :src="require('@/user/assets/final.png')" />
        </center>
        <h1 class="text-center">Barangay Clearance</h1>
        <h2 class="text-center font-italic headline">Office of the Punong Barangay</h2>
        <h2 class="text-center">Talamban, Cebu City</h2>
        <h2 class="text-center headline">Local Government Code of 1991</h2>
        <br /><br /><br /><br />

        <h2 class="headline mx-12">
          TO WHOM IT MAY CONCERN:
          <br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is to certify that {{name.firstName }} {{name.middleName}} {{name.lastName}} {{name.suffix}}, {{age}} years of age, {{status}} and a Filipino Citizen is a bonifide resident of Sitio {{address.sitio}}, Barangay {{address.barangay}}, {{address.municipality}}, {{address.province}}, he/she is known to me with a Good Moral character, law abiding citizen in the community. He/She has NO CRIMINAL RECORD found in our Barangay Records.
          <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This certification is issued in accordance to the implementation of the provision of the NEW LOCAL GOVERNMENT CODE of 1991 and for whatever legal purpose it may serve best.
        </h2><br /><br /><br /><br />
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submit" color="white" fab large>Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
//import Swal from "sweetalert2";
export default {
  props: {
    citizenship: String,
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
      suffix: String
    },
    age: Number,
    status: String,
    sex: String,
    address: {
      sitio: String,
      barangay: String,
      municipality: String,
      province: String
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if (
        this.citizenship &&
        this.name.firstName &&
        this.name.lastName &&
        this.age &&
        this.sex &&
        this.status &&
        this.address.sitio &&
        this.address.barangay &&
        this.address.municipality &&
        this.address.province
      ) {
        let currentObj = this;
        this.$axios
          .post("http://localhost:4000/user/barangay-clearance", {
            name: {
              firstName: this.name.firstName,
              middleName: this.name.middleName,
              lastName: this.name.lastName,
              suffix: this.name.suffix
            },
            citizenship: this.citizenship,
            age: this.age,
            sex: this.sex,
            status: this.status,
            address: {
              sitio: this.address.sitio,
              barangay: this.address.barangay,
              municipality: this.address.municipality,
              province: this.address.province
            },
            docType: "Barangay Clearance"
          })
          .then(function(response) {
            currentObj = response.data;
          //   Swal.fire({
          // icon: "success",
          // title: "Sent!"})
          })
          .catch(function(error) {
            currentObj = error;
          });
        console.log("Request sent!");
      } else {
        // Swal.fire({
        //   icon: "error",
        //   title: "Fields not completed!"
        // });
      }
    }
  }
};
</script>
