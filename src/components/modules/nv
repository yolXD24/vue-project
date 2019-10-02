<template >
  <v-container>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span>Express</span>
        <span class="font-weight-light">_docx</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="#">
        <span class="mr-2">Beta Version</span>
      </v-btn>
    </v-app-bar>
    <br />
    <v-navigation-drawer v-model="drawer" absolute temporary style="z-index:2">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home" },
      { title: "Transaction History", icon: "mdi-history" },
      { title: "Account Settings", icon: "mdi-settings" },
      { title: "Add Staff", icon: "mdi-plus" },
      { title: "Logout", icon: "mdi-logout" }
    ],
    drawer: false,
    group: null
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>