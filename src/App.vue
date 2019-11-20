<template>
  <v-app app>
    <Sidebar v-if="$store.state.status  && $route.name != 'notFound' && !$route.meta.user" />
    <v-content
      dark
      id="content"
    >
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
import Sidebar from "./pages/admin/components/Sidebar";

export default {
  components:{
    Sidebar
  }
}
</script>
