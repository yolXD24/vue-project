<template>
  <div>
    <v-card
      max-width="900"
      class="border mx-auto"
      color="white darken-3"
      light
    >
      <br />
      <br />
      <p class="text-center display-1 ">Barangay Clearance</p>
      <p class="text-center subtitle-1 font-italic ">Office of the Punong Barangay</p>
      <h4 class="text-center">Local Government Code of 1991</h4>
      <div class="flex-grow-1"></div>
      <v-card-text>
        <br />
        <v-row justify="space-between">
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="name.firstName"
              :rules="[$rules.required, $rules.nameRules]"
              label="First Name"
            ></v-text-field>
          </v-col>
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="name.middleName"
              :rules="[$rules.required, $rules.nameRules]"
              label="Middle Name"
            ></v-text-field>
          </v-col>
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="name.lastName"
              :rules="[$rules.required, $rules.nameRules]"
              label="Last Name"
            ></v-text-field>
          </v-col>
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="age"
              type="number"
              :rules="[$rules.ageRules, $rules.required]"
              label="Age"
            ></v-text-field>
          </v-col>
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-select
              :items="['male' ,'female']"
              :rules="[$rules.required]"
              label="Sex"
              v-model="sex"
            ></v-select>
          </v-col>
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-select
              v-model="status"
              :items="['Single' ,'Married','Divorced','Separated','Widowed']"
              label="Civil Status"
              :rules="[$rules.required]"
            ></v-select>
          </v-col>
          <!-- business -->
          <v-col
            class="px-10"
            v-if="businessMode"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="business"
              :rules="[$rules.required]"
              label="Business name"
            ></v-text-field>
          </v-col>
          <v-col
            class="px-10"
            v-if="businessMode"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              type="date"
              v-model="dateStarted"
              :rules="[$rules.required]"
              label="Date Started"
            ></v-text-field>
          </v-col>
          <!--end business -->

          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="address.sitio"
              :rules="[$rules.nameRules]"
              label="Sitio"
            ></v-text-field>
          </v-col>
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              :rules="[$rules.required,$rules.nameRules]"
              v-model="address.barangay"
              disabled
              label="Barangay"
            ></v-text-field>
          </v-col>
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="address.city"
              disabled
              label="City"
            ></v-text-field>
          </v-col>
          <v-col
            class="px-10"
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="address.province"
              label="Province"
              disabled
            ></v-text-field>
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
</template>
<script>
// import ModalBarangay from "./ModalBarangay";
export default {
  components: {
    // ModalBarangay
  },
  data() {
    return {
      title: "",
      businessMode: false,
      actNo: "",
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
  }
};
</script>
