<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-poll"
          title="counts selling"
          v-model="count"
          sub-icon="mdi-tag"
          sub-text="Tracked from Google Analytics"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-store"
          title="Total Revenue"
          v-model="total"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-sofa"
          title="Best product"
          v-model="best.name"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
      </v-col>

      <v-col
        cols="12"
        lg="12"
      >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        dailySalesChart: {
          data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            series: [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 8, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        tabs: 0,
        revenue: [],
        orders: [],
        best: null,
        products: [],
        count: null,
        total: 0,
      }
    },
    created () {
      this.$http.get('/api/products').then((response) => {
        this.products = response.data
      })

      this.$http.get('/api/orders/')
        .then((response) => {
          this.orders = response.data
          this.count = this.orders.length
          var sum = 0
          for (var i = 0; i < this.orders.length; i++) {
            sum += this.products[this.orders[i].pid].price
          }
          this.total = sum
        })
      this.$http.get('/api/orders/find_best')
        .then((response) => {
          var max = -1
          var index = 0
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].total >= max) index = i
          }
          this.best = this.products[index]
        })
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      refresh () {
        var sum = 0
        for (var i = 0; i < this.orders.length; i++) {
          sum += this.products[this.orders[i].pid].price
        }
        this.total = sum
      },
    },
  }
</script>
