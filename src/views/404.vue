<template>
  <v-container fluid>
    <br><br><br>
    <v-row
      id="content"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="5"
      >
        <center>
          <v-card
            class=" mx-lg-auto pa-4"
            style="background-color:rgba(0,0,0,0.7)"
          > <br><br>
            <v-card-text>
              <v-layout align-center>
                <v-flex text-center>
                  <h1 class="display-4 white--text font-weight-bold">Whoops!</h1>
                  <br>
                  <p class="title blue--text lighten-3 font-italic">The page you were looking for does not exist..</p> <br>

                  <v-btn
                    to="/"
                    outlined
                    color="blue"
                    width="210"
                    rounded
                  >
                    Back to Home
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>

            <br><br>
          </v-card>
        </center>
      </v-col>
    </v-row>
  </v-container>
</template>

