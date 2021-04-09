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
        sm="12"
        lg="12"
      >
        <v-card class="mx-auto">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            width="200px"
          />
          <v-card-title>
            {{product.name}}
          </v-card-title>
          <v-spacer />
          <v-card-subtitle>
            Gender : {{product.gender==null || product.gender=='MW' ? 'Man and Woman' : product.gender=='M' ? 'Man' : 'Woman'}}
          </v-card-subtitle>
          <v-card-text>
            price : {{product.price}} $
          </v-card-text>
          <v-btn color="red darken-1" text @click="deleteCart(i)">Delete in Cart</v-btn>
          <v-card-actions>
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
    <v-btn class="ma-2" block color="secondary" @click="goBuy()" v-if="products.length>0">Buy all products in Cart</v-btn>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        products: [],
        show: false,
        pids: [],
      }
    },
    created () {
      this.$http.post('/api/cart/getcart', { uid: this.$store.state.user.uid })
        .then((response) => {
          this.pids = response.data
        })
      this.$http.get('/api/products')
        .then((response) => {
          this.products = response.data
          this.refresh()
        })
    },
    methods: {
      refresh () {
        for (var i = 0; i < this.products.length; i++) {
          var ck = 0
          for (var j = 0; j < this.pids.length; j++) {
            if (this.pids[j].pid === this.products[i].pid) {
              ck = 1
              break
            }
          }
          if (ck === 1) continue
          this.products.splice(i, 1)
          i--
        }
      },
      complete (index) {
        this.list[index] = !this.list[index]
      },
      view (index) {
        this.show[index] = !this.show[index]
        alert(this.show[index])
      },
      deleteCart (index) {
        this.$http.post('/api/cart/deletecart', { uid: this.$store.state.user.uid, pid: this.products[index].pid })
          .then((response) => {
            alert('delete product in cart success!')
            this.products.splice(index, 1)
          })
      },
      goBuy () {
        this.$http.post('/api/cart/deletecartAll', { uid: this.$store.state.user.uid })
          .then((response) => {
            this.products = null
          })
        var date = new Date()
        this.$http.post('/api/orders/addorder', {
          uid: this.$store.state.user.uid,
          address: this.$store.state.user.address,
          products: this.products,
          order_time: date.toISOString().slice(0, 19).replace('T', ' '),
        }).then((response) => {
          alert(response.data.message)
          this.$router.push('/Home')
        })
      },
    },
  }
</script>
