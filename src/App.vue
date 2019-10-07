<template>
  <v-app>
    <v-content>
      <div id="app">
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>

<script>

export default {

  name: "App",
  // data() {
  //   return {
  //     authenticated: localStorage.getItem("jwt")
  //   };
  // },
  // mounted() {
  //   console.log(localStorage.getItem('jwt'))
  //   if (localStorage.getItem('jwt') === null) {
  //     this.$router.replace('/signin')
  //   } else{
  //    this.$router.replace('/home')
  //   }
  // }
};
</script>
