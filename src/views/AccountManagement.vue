<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="11">
            <v-card-text class="display-1 text-center font-weight-light">
                  Accounts Management
            </v-card-text>
        <v-card class="elevation-4"
        >
          <v-data-table
            :headers="headers"
            :items="items"          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        sortable: true,
        text: "Name",
        value: "name"
      },
      {
        sortable: true,
        text: "Request",
        value: "Request"
      },
      {
        sortable: true,
        text: "Officer In charge",
        value: "oic"
      },
      {
        sortable: true,
        text: "Date",
        value: "Date"
      }
    ],
    items: [
      {
        name: "Dakota Rice",
        Request: "Barangay Clearance",
        oic: "Oud-Tunrhout",
        Date: "10/10/19"
      },
      {
        name: "Minerva Hooper",
        Request: "Barangay Clearance",
        oic: "Sinaai-Waas",
        Date: "10/10/19"
      },
      {
        name: "Sage Rodriguez",
        Request: "Barangay Clearance",
        oic: "Overland Park",
        Date: "10/10/19"
      },
      {
        name: "Philip Chanley",
        Request: "Barangay Clearance",
        oic: "Gloucester",
        Date: "10/10/19"
      },
      {
        name: "Doris Greene",
        Request: "Barangay Clearance",
        oic: "Feldkirchen in Kārnten",
        Date: "10/10/19"
      },
      {
        name: "Mason Porter",
        Request: "Barangay Clearance",
        oic: "Gloucester",
        Date: "10/10/19"
      }
    ]
  })
};
</script>
