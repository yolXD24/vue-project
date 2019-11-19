<template >
  <div>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Express</span>
        <span class="font-weight-light">_docx</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row id="head">
      <v-col cols="12" md>
        <v-carousel
          interval="4200"
          id="carousel"
          continuous
          cycle
          hide-delimiters
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(i) in 3" :key="i--">
            <v-container fill-height fluid>
              <v-layout align-center>
                <v-flex>
                  <h4
                    class="display-2 heading white--text text-uppercase"
                    align="center"
                    justify="center"
                  >{{docs[i]}} !</h4>
                </v-flex>
              </v-layout>
            </v-container>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-container id="docs">
      <v-item-group multiple>
        <v-row no-gutters>
          <v-col v-for="item in items" :key="item.title" cols="12" md="4">
            <v-row class="justify-center">
              <v-col cols="12" md="11">
                <center>
                  <v-item v-slot:default="{ active, toggle }">
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        class="pa-2"
                        tile
                        max-height="520"
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                      >
                        <v-img
                          src="~@/user/assets/docx.jpg"
                          height="200px"
                          @click="$router.push(item.link)"
                        ></v-img>
                        <v-card-title>{{item.title}}</v-card-title>
                        <v-card-text>
                          <v-card-actions>
                            <p>
                              <b>Requirements</b>
                            </p>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="toggle">
                              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                          </v-card-actions>
                          <v-expand-transition>
                            <div v-show="active">
                              <v-divider></v-divider>
                              <v-card-text
                                class="caption text-start"
                                v-for="(req,i) in item.requirement"
                                :key="i"
                              >{{(i+1)+'. '+ req}}</v-card-text>
                            </div>
                          </v-expand-transition>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-item>
                </center>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
    <!-- <Footer/> -->
  </div>
</template>
<style scoped>
#head {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("~@/user/assets/headerbackground.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
  top: 0;
  padding: 0px;
}
.btnTrans {
  width: 200px;
}
#docs {
  background: white;
  margin-top: -100px;
  padding-top: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 10px 5px black;
  padding-top: 20px;
}
#carousel {
  margin-top: -80px;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
<script>
import Footer from "@/user/components/Footer";
export default {
  components: {
    Footer
  },
  data() {
    return {
      show: false,
      docs: ["easy", "safe", "free"],
      items: [
        {
          title: "Barangay Clearance",
          requirement: [
            "Application Form",
            "Application Fee (Usually varies around less than P100)",
            "Recent Community Tax Certificate or Cedula."
          ],
          icon: "mdi-home",
          link: "/barangay-clearance"
        },
        {
          title: "Barangay Indigency",
          requirement: [
            "Application Form",
            "Application Fee (Usually varies around less than P100)",
            "Recent Community Tax Certificate or Cedula"
          ],
          icon: "mdi-home",
          link: "/barangay-indigency"
        },
        {
          title: "Business Clearance",
          requirement: [
            "Latest Community Tax Certificate (Cedula)",
            "DTI Business Name Registration",
            "Barangay Business Permit Fee"
          ],
          icon: "mdi-home",
          link: "/business-clearance"
        }
      ],
      drawer: false,
      group: null
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>