<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1>Home page</h1>
        <p>This is a user's home page</p>
      </v-col>
      <v-col class="text-center">
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: 'Home',
    data () {
      return {
        products: [],
        show: false,
        kinds: [],
      }
    },
    created () {
      console.log(this.$store.state.user)
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
