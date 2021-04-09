<template>
  <v-container
    id="Products"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        v-for="(product, i) in products"
        :key="i"
        cols="12"
        sm="6"
        lg="6"
      >
        <v-card class="mx-auto">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          />
          <v-card-title class="text-lg-center">
            {{product.name}}
          </v-card-title>
          <v-spacer />
          <v-card-text>
            Gender : {{product.gender==null || product.gender=='2' ? 'Man and Woman' : product.gender=='0' ? 'Man' : 'Woman'}}
          </v-card-text>
          <v-card-text>
            Kind : {{kinds[product.kind]}}
          </v-card-text>
          <v-card-text>
            price : {{product.price}} $
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="purple"
              text
              @click="goCart(i)"
            >
              Cart
            </v-btn>
            <v-spacer />
            <v-btn
              icon
              @click="show = !show"
            >
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
              <v-divider></v-divider>
                <v-card-text>
                  {{product.comments}}
                </v-card-text>
              </div>
            </v-expand-transition>
         </v-card>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        products: [],
        show: false,
        kinds: [],
      }
    },
    created () {
      this.$http.get('/api/products')
        .then((response) => {
          this.products = response.data
        })
      this.$http.get('/api/products/kinds')
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            this.kinds.push(response.data[i].name)
          }
        })
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      view (index) {
        this.show[index] = !this.show[index]
        alert(this.show[index])
      },
      goBuy (index) {
        this.$store.commit('SET_PID', this.products[index].pid)
        this.$router.push('/checkout')
      },
      goCart (index) {
        if (this.$store.state.user.permission === 0) {
          alert('plz Login!')
          return
        }
        this.$http.post('/api/cart/addcart', { uid: this.$store.state.user.uid, pid: this.products[index].pid })
          .then((response) => {
            alert(response.data.message)
          })
        // this.$store.commit('SET_PID', this.products[index].pid)
        // this.$router.push('/cart')
      },
    },
  }
</script>
