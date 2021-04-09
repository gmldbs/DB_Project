<template>
  <v-container
    id="typography"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Typography"
      link="styles/typography"
    />

    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12">
        <base-material-card
          color="green"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Delivery List
            </div>
          </template>

          <v-card-text>
            <v-container class="pa-0" fluid>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text">
                      Delivery No.
                    </th>
                    <th class="primary--text">
                      Order No.
                    </th>
                    <th class="primary--text">
                      Delivery Kind
                    </th>
                    <th class="primary--text">
                      Order Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(delivery, i) in deliverys" :key="i">
                    <td>{{ delivery.dnum }}</td>
                    <td>{{ delivery.order_num}}</td>
                    <td>{{ delivery.delivery_kind }}</td>
                    <td>{{ delivery.delivery_time }}</td>
                  </tr>
                </tbody>
      </v-simple-table>
            </v-container>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        deliverys: [],
      }
    },
    created () {
      this.$http.get('/api/delivery')
        .then((response) => {
          this.deliverys = response.data
        })
    },
  }
</script>
