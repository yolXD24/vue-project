<template>
  <v-footer
    absolute
    inset
    dense
    color="transparent"
  >
    <v-col
      class="text-center"
      cols="12"
    >
      <v-alert
        prominent
        type="error"
        icon="mdi-shield-lock-outline"
        dense
      >
        <v-row align="center">
          <v-col class="grow">Note : Password must be Changed!</v-col>
          <v-col
            class="shrink"
            v-if="$route.name!=='settings'"
          >
            <v-btn
              small
              to="admin/settings"
              light
            >Go to settings</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-col>
  </v-footer>
</template>
