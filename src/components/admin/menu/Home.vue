<template>
  <v-app>
    <v-content style="padding:0 ;height : 100%">
       <div id="app">
        
           <NavBar/>
        </div>

    </v-content>

  </v-app>
</template>
<script>
import NavBar from "@/components/modules/NavBar.vue";

export default {
   components: {
    NavBar
  },
};
</script>
