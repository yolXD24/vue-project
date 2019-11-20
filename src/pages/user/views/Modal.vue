<template>
  <div>
    <v-dialog width="900">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="white" fab large>Preview</v-btn>
      </template>
      <v-card max-width="900" class="col-sm-7 border mx-auto">
        <br />
        <center>
          <img height="200" width="200" :src="require('@/user/assets/final.png')" />
        </center>
        <h1 class="text-center">Business Clearance</h1>
        <h2 class="text-center font-italic headline">Office of the Punong Barangay</h2>
        <h2 class="text-center">Talamban, Cebu City</h2>
        <h2 class="text-center headline">Required under RA 7160 Sec. 152</h2>
        <br />
        <br />
        <br />
        <br />

        <h2 class="headline mx-12">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is to certify that {{name.firstName }} {{name.middleName}} {{name.lastName}} {{name.suffix}}, is legitimately engaged in the business of {{kindOfBusiness}}, with address at
          Sitio {{address.sitio}}, Barangay {{address.barangay}}, {{address.municipality}}, {{address.province}}.
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The applicant has been doing this since {{dateStarted}} and known to the community as peaceloving and law-abiding citizen.
          <br />
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Her/his business establishment does not encroach on any public road or street.
          <br />
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issued pursuant to Sec. 152, par. (c) of RA 7160 otherwise known as Local Government Code of 1991.
        </h2>
        <br />
        <br />
        <br />
        <br />
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="submit" fab large>Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    kindOfBusiness: String,
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
      suffix: String
    },
    address: {
      sitio: String,
      barangay: String,
      municipality: String,
      province: String
    },
    dateStarted: String
  },
  methods: {
    submit(e) {
       if (
        this.kindOfBusiness &&
        this.name.firstName &&
        this.name.lastName &&
        this.dateStarted &&
        this.address.sitio &&
        this.address.barangay &&
        this.address.municipality &&
        this.address.province
      ) {
      let currentObj = this;
      e.preventDefault();
      this.$axios
        .post("http://localhost:4000/user/business-clearance", {
          kindOfBusiness: this.kindOfBusiness,
          name: this.name,
          address: {
              sitio: this.address.sitio,
              barangay: this.address.barangay,
              municipality: this.address.municipality,
              province: this.address.province
            },
          dateStarted: this.dateStarted
        })
        .then(function(response) {
          currentObj = response.data
          // Swal.fire({
          // icon: "success",
          // title: "Sent!"})
          alert("sent")
        })
        .catch(function(error) {
          currentObj = error
        });
    }else{
      // Swal.fire({
      //     icon: "error",
      //     title: "Fields not completed!"
      //   });
      alert("error!")
    }}
  }
};
</script>
