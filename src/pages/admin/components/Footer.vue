<template>
  <v-footer
    
    app
    width='81%'
    inset
    dense
    color="transparent"
  >
    <v-row
      justify="end"
      align="center"
    >
      <v-col
        align="end"
        justify="center"
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
            <v-col class="shrink">
              <v-btn
                v-if="$route.name !=='settings'"
                small
                to="/admin/settings"
                light
              >Go to settings</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </v-footer>
</template>
