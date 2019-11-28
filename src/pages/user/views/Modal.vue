<template>
  <v-dialog fullscreen>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="white" @click="$emit('preview',true)" fab large>Preview</v-btn>
    </template>
    <v-card>
      <center>
        <Preview :type="type" :info="info" />
      </center>
    </v-card>
  </v-dialog>
</template>
<script>
import Preview from "./Preview";
export default {
  name: "Modal",
  components: {
    Preview
  },
  props: {
    type: String,
    info: Object
  }
  //methods: {
  /* submit(e) {
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
    }}*/
  //}
};
</script>
