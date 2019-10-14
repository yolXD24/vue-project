<template>
  <v-container
    fluid
    grid-list-xl

  >
  <br><br>  
    <v-row justify="center">
      <v-col
         cols="8"
      >
      <v-card class="elevation-4 text-center">
          <v-row>
            <v-col cols="4">
              <br>
          <v-avatar
            slot="offset"
            class="mx-auto elevation-6"
            size="180"
          >
            <img
              src="data:image/png;base64,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"
            >
          </v-avatar>
            </v-col>
            <v-col class="text-justify">
                <v-card-text >
                  <h4 class=" title text-uppercase" >
                  Name :  {{credentials.firstname +" " +credentials.lastname}}
                  </h4>
                  <br>
                  <h6 class="subtitle-2  mb-3 ">
                  Username :  {{credentials.username}}
                  </h6>
                  <h6 class="subtitle-2  mb-3">
                  Email :  {{credentials.email}}
                  </h6>
                  <h6 class="subtitle-2  mb-3 text-capitalize">
                  position :  {{credentials.position}}
                  </h6>
                  <v-btn color="success">
                    Update
                  </v-btn>
                </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
     credentials:JSON.parse(localStorage.getItem("user"))
    }
  }
};
</script>
