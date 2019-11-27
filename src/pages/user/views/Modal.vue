<template>
  <div>
    <v-dialog width="900">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="white" fab large>Preview</v-btn>
      </template>
      <v-card max-width="900" class="px-10">
        <Preview :type="type" :info="info"/>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
  type:String,
  info:Object
    }
  },
  methods: {
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
  }
};
</script>
