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
      <div v-if="!preview_mode">
        <p class="text-center font-weight-bold headline">{{$route.params.type=="business-clearance"?"Business Clearace": $route.params.type=="barangay-clearance"?"Barangay Clearance":"Barangay Indigency"}}</p>
        <p class="text-center subtitle-1 font-italic">Office of the Punong Barangay</p>
        <h4 class="text-center subtitle-2">{{$route.params.type=="business-clearance"?"Required under RA 7160 Sec. 125": $route.params.type=="barangay-clearance"?"Local Government Code of 1991": "Required under RA 7160 Sec. 152"}}</h4>
      </div>
      <v-card-text>
        <v-form
          ref="form"
          v-if="!preview_mode"
          lazy-validation
        >
          <br>
          <v-row>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="info.name.firstName"
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
                v-model="info.name.middleName"
                dense
                :rules="[$rules.required, $rules.nameRules]"
                height="20"
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
                v-model="info.name.lastName"
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
                v-model="info.age"
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
                :items="['Male' ,'Female']"
                :rules="[$rules.required]"
                label="Sex"
                dense
                height="20"
                v-model="info.sex"
              ></v-select>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-select
                v-model="info.status"
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
                v-model="info.business"
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
                v-model="info.dateStarted"
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
                v-model="info.address.sitio"
                :rules="[ $rules.nameRules]"
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
                v-model="info.address.barangay"
                dense
                height="20"
                readonly
                label="Barangay"
              ></v-text-field>
            </v-col>
            <v-col
              class="px-10"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="info.address.city"
                readonly
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
                v-model="info.address.province"
                label="Province"
                readonly
                dense
                height="20"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <Preview
          :url="createdPDF"
          v-if="preview_mode"
        />
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn
          text
          :disabled="!previewed"
          @click="send"
        >Send</v-btn>
        <v-btn
          text
          v-if="preview_mode"
          @click="preview_mode= false"
        >Edit</v-btn>
        <v-btn
          text
          @click="preview"
          v-if="!preview_mode"
        >Preview</v-btn>
      </v-card-actions>
    </v-card>
    <Snackbar ref="snackbar" />
  </div>
</template>
<script>
import generatePDF from "@/system/functions/generatePDF";
import { userPreview } from "@/system/functions/userPreview";
import printJS from "print-js";
export default {
  props: {
    toBeEdit: Object,
    editMode: Boolean
  },
  components: {
    Preview: () => import("./Preview.vue"),
    Snackbar: () => import('../components/Snackbar')
  },
  data() {
    return {
      url: "",
      isLoading: false,
      previewed: false,
      preview_mode: false,
      createdPDF: null,
      code: null,
      image: require("../assets/1.jpg"),
      info: {
        name: {
          firstName: "",
          middleName: "",
          lastName: "",
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
      }
    };
  },
  computed: {
    businessMode() {
      return this.$route.params.type == "business-clearance";
    }
  },
  methods: {
    preview() {
      if (this.$refs.form.validate()) {
        var info = {
          firstname: this.info.name.firstName,
          lastname: this.info.name.lastName,
          business: this.info.business,
          location: this.info.address.sitio
        };
        this.previewed = true;
        userPreview(this.$route.params.type, info, null)
          .then(res => {
            this.preview_mode = true;
            this.createdPDF = res.pdfPreview;
            this.url = res.dataUrl;
          })
          .catch(err => {
            this.$refs.snackbar.snackbar = true;
            this.$refs.snackbar.text = err;
          });
      } else {
          this.notify("Required fields must be filled!");
      }

    },
    send() {
      this.$store.state.axios
        .post(`${this.$urls.user_local_api}/submit/${this.$route.params.type}`, {
          name: {
            firstName: this.info.name.firstName,
            middleName: this.info.name.middleName,
            lastName: this.info.name.lastName,
          },
          citizenship: this.info.citizenship,
          age: this.info.age,
          sex: this.info.sex,
          status: this.info.status,
          address: {
            sitio: this.info.address.sitio,
            barangay: this.info.address.barangay,
            city: this.info.address.city,
            province: this.info.address.province
          },
          business: this.info.business,
          dateStarted: this.info.dateStarted,
          docType: this.$route.params.type
        })
        .then(response => {
          this.code = response.data.data.body.access_code;
          console.log(this.code);
          this.$router.push("/user/get/claim-code/" + this.code);
        })
        .catch(error => {
          this.notify("Transaction failed successfully!");
        });
    },
    notify(message) {
      this.$refs.snackbar.snackbar = true;
      this.$refs.snackbar.text = message;
      
    }
  }
};
</script>
