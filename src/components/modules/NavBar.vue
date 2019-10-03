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
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
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
      <v-container id="app">
        <router-view></router-view>
      </v-container>

    </v-content>
  </v-app>
</template>

<script>


export default {
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home", link: "home/main" },
      { title: "Transaction History", icon: "mdi-history", link: "/home/history" },
      { title: "Account Settings", icon: "mdi-settings", link: "/home/settings" },
      { title: "Add Staff", icon: "mdi-plus", link: "/home/register" },
      { title: "Logout", icon: "mdi-logout", link: "/signin" }
    ],
    drawer: false,
    group: null
  }),
  watch: {
    group() {
      // this.drawer = false;
    }
  }
};
</script>
