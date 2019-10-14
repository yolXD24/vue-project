<template> 
    <div>
 <!-- <v-app-bar app clipped-right light @click="drawer =!drawer">
    
            <v-app-bar-nav-icon ></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
    
                <span>Express</span>
    
                <span class="font-weight-light">_docx</span>
    
            </v-toolbar-title>
    
        </v-app-bar> 
     -->
        <v-navigation-drawer v-model="drawer" permanent app>
    
            <v-list-item>
    
                <v-list-item-content>
    
                    <v-list-item-title class="title text-center">Menu</v-list-item-title>
    
                </v-list-item-content>
    
            </v-list-item>
    
            <v-list nav dense>
    
                <v-divider></v-divider>
    
                <v-list-item v-for="item in items" :key="item.title" :to="item.link" @click.stop="drawer = !drawer">
    
                    <v-list-item-icon>
    
                        <v-icon>{{ item.icon }}</v-icon>
    
                    </v-list-item-icon>
    
                    <v-list-item-content>
    
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
    
                    </v-list-item-content>
    
                </v-list-item>
                <v-list-item v-if="is_admin" to="/admin/register">
    
                    <v-list-item-icon>
    
                        <v-icon>mdi-plus</v-icon>
    
                    </v-list-item-icon>
    
                    <v-list-item-content>
    
                        <v-list-item-title>Add Staff</v-list-item-title>
        
                    </v-list-item-content>
    
                </v-list-item>
                <v-list-item v-if="is_admin" to="/admin/AccountManagement">
    
                    <v-list-item-icon>
    
                        <v-icon>mdi-users</v-icon>
    
                    </v-list-item-icon>
    
                    <v-list-item-content>
    
                        <v-list-item-title>Manage Accounts</v-list-item-title>
        
                    </v-list-item-content>
    
                </v-list-item>
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
<script>
export default {
  data: () => ({
    is_admin: JSON.parse(localStorage.getItem("user")).position === "admin",
    items: [
      { title: "Home", icon: "mdi-chart-bubble", link: "/" },
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
    ],
    drawer: false,
    group: null
  }),
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      location.reload(true);
    }
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
