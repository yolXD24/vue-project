<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right light>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Express</span>
        <span class="font-weight-light">_docx</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list nav dense>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link" @click="swapComponent(item.link)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MainScreen from "@/components/admin/menu/MainScreen.vue";
import Register from "@/components/admin/auth/Register.vue";

export default {
  components: {
    MainScreen,
    Register
  },
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home", link: "main" },
      { title: "Transaction History", icon: "mdi-history", link: "/history" },
      { title: "Account Settings", icon: "mdi-settings", link: "/settings" },
      { title: "Add Staff", icon: "mdi-plus", link: "register" },
      { title: "Logout", icon: "mdi-logout", link: "/login" }
    ],
    drawer: false,
    group: null
  }),
  swapComponent: function(component) {
    this.currentComponent = component;
  },
  watch: {
    group() {
      // this.drawer = false;
    }
  }
};
</script>
