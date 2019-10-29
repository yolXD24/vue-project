<template>
  <div>
    <v-navigation-drawer v-model="drawer" elevation="5" permanent app id="sidebar">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list nav dense>
        <v-divider></v-divider>
        <v-list-item
          active-class="blue darken-2 white--text text--accent-4"
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          @click.stop="drawer = !drawer"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="item in admin_items">
          <v-list-item
            v-if="is_admin === true"
            active-class="blue darken-2 white--text text--accent-4"
            :key="item.title"
            :to="item.link"
            @click.stop="drawer = !drawer"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<style scoped>
#sidebar {
  opacity: 0.8 !important;
}
</style>

<script>
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      is_admin: null,
      items: [],
      admin_items: [],
      drawer: false,
      group: null
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("default");
      this.$router.push("/login");
    }
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  mounted() {
    this.is_admin = jwt_decode(localStorage.getItem("token")).id.admin;
    this.items = [
      {
        title: "Home",
        icon: "mdi-chart-bubble",
        link: "/home"
      },
      {
        title: "Transaction History",
        icon: "mdi-history",
        link: "/admin/history"
      },
      {
        title: "Account Settings",
        icon: "mdi-settings",
        link: "/admin/settings"
      }
    ];
    this.admin_items = [
      {
        title: "Add Staff",
        icon: "mdi-account-plus",
        link: "/admin/register"
      },
      {
        title: "Manage Accounts",
        icon: "mdi-account-key",
        link: "/admin/AccountManagement"
      }
    ];
  }
};
</script>
