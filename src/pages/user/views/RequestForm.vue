<template>
  <div>
    <br>
    <br>
    <v-card
      max-width="650"
      class="border mx-auto"
      color="white darken-3"
      light
      width="650"
    >
      <br>
      <p class="text-center font-weight-bold headline">{{$route.params.type=="business-clearance"?"Business Clearace": $route.params.type=="barangay-clearance"?"Barangay Clearance":"Barangay Indigency"}}</p>
      <p class="text-center subtitle-1 font-italic">Office of the Punong Barangay</p>
      <h4 class="text-center subtitle-2">{{$route.params.type=="business-clearance"?"Required under RA 7160 Sec. 125": $route.params.type=="barangay-clearance"?"Local Government Code of 1991": "Required under RA 7160 Sec. 152"}}</h4>
      <v-card-text>
        <br />
        <v-form ref="form">
          <v-row>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="name.firstName"
                :rules="[$rules.required, $rules.nameRules]"
                label="First Name"
                dense
                height="20"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="name.middleName"
                dense
                height="20"
                :rules="[$rules.required, $rules.nameRules]"
                label="Middle Name"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
              dense
              height="20"
            >
              <v-text-field
                v-model="name.lastName"
                :rules="[$rules.required, $rules.nameRules]"
                label="Last Name"
                dense
                height="20"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="age"
                type="number"
                :rules="[$rules.ageRules, $rules.required]"
                label="Age"
                dense
                height="20"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-select
                :items="['male' ,'female']"
                :rules="[$rules.required]"
                label="Sex"
                dense
                height="20"
                v-model="sex"
              ></v-select>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-select
                v-model="status"
                :items="['Single' ,'Married','Divorced','Separated','Widowed']"
                label="Civil Status"
                :rules="[$rules.required]"
                dense
                height="20"
              ></v-select>
            </v-col>
            <!-- business -->
            <v-col
              class="px-10"
              v-if="businessMode"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="business"
                :rules="[$rules.required]"
                label="Business name"
                dense
                height="20"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              v-if="businessMode"
              sm="6"
              md="6"
            >
              <v-text-field
                type="date"
                v-model="dateStarted"
                :rules="[$rules.required]"
                label="Date Started"
                dense
                height="20"
              ></v-text-field>
            </v-col>
            <!--end business -->

            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="address.sitio"
                :rules="[$rules.nameRules]"
                dense
                height="20"
                label="Sitio"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                :rules="[$rules.required,$rules.nameRules]"
                v-model="address.barangay"
                dense
                height="20"
                disabled
                label="Barangay"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="address.city"
                disabled
                label="City"
                dense
                height="20"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="address.province"
                label="Province"
                disabled
                dense
                height="20"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

    </v-card>
  </div>
</template>
<script>
// import ModalBarangay from "./ModalBarangay";
export default {
  props: {
    toBeEdit: Object,
    editMode: Boolean
  },
  components: {
    // ModalBarangay
  },
  data() {
    return {
      image: require("../assets/1.jpg"),
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
        barangay: "Talamban",
        city: "Cebu City",
        province: "Cebu"
      },
      business: "",
      dateStarted: ""
    };
  },
  computed: {
    businessMode() {
      return this.$route.params.type == 'business-clearance';
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        // send to server
      } else {
        alert("error");
      }
    }
  },

  mounted(){
    if (this.editMode) {
      
    }
  }


};
</script>
