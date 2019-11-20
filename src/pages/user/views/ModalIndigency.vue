<template>
  <div>
    <v-dialog width="900">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          color="white"
          fab
          large
        >Preview</v-btn>
      </template>
      <v-card
        max-width="900"
        class="col-sm-7 border mx-auto"
      >
        <br />
        <center>
          <img
            height="200"
            width="200"
            :src="require('../assets/final.png')"
          />
        </center>
        <h1 class="text-center">Barangay Certificate of Indigency</h1>
        <h2 class="text-center font-italic headline">Office of the Punong Barangay</h2>
        <h2 class="text-center">Talamban, Cebu City</h2>
        <h2 class="text-center headline">Local Government Code of 1991</h2>
        <br />
        <br />
        <br />
        <br />

        <h2 class="headline mx-12">
          TO WHOM IT MAY CONCERN:
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is to certify that {{name.firstName }} {{name.middleName}} {{name.lastName}} {{name.suffix}}, {{age}} years old, is a resident of {{address.sitio}}, {{address.barangay}}, {{address.municipality}}, {{address.province}}.
          <br />
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is further certified that the above-named individual belongs to a low/no bracket or an indigent family in this barangay.
        </h2>
        <br />
        <br />
        <br />
        <br />
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="submit"
            color="white"
            fab
            large
          >Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
      suffix: String
    },
    age: Number,
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
      if (
        this.age &&
        this.name.firstName &&
        this.name.lastName &&
        this.sex &&
        this.address.sitio &&
        this.address.barangay &&
        this.address.municipality &&
        this.address.province
      ) {
        e.preventDefault();
        let currentObj = this;
        this.$axios
          .post("http://localhost:4000/user/barangay-indigency", {
            name: this.name,
            age: this.age,
            sex: this.sex,
            address: {
              sitio: this.address.sitio,
              barangay: this.address.barangay,
              municipality: this.address.municipality,
              province: this.address.province
            }
          })
          .then((response) => {
            currentObj = response.data;
            alert("sent");
          })
          .catch((error) => {
            currentObj = error;
          });
      } else {
        alert("sent");
      }
    }
  }
};
</script>
