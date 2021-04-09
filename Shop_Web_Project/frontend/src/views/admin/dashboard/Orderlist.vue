<template>
  <v-container
    id="typography"
    fluid
    tag="section"
  >
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
              Order List
            </div>
          </template>

          <v-card-text>
            <v-container class="pa-0" fluid>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text">
                      Order No.
                    </th>
                    <th class="primary--text">
                      PID
                    </th>
                    <th class="primary--text">
                      UID
                    </th>
                    <th class="primary--text">
                      Order Time
                    </th>
                    <th class="primary--text">
                      Address
                    </th>
                    <th class="primary--text">
                      state
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, i) in orders" :key="i">
                    <td>{{ order.order_id }}</td>
                    <td>{{ order.pid }}</td>
                    <td>{{ order.uid }}</td>
                    <td>{{ order.order_time }}</td>
                    <td>{{ order.address }}</td>
                    <td>
                      <v-select :items="states" v-model="order.state" label="Solo field" v-on:change="save(i)" solo></v-select>
                    </td>
                  </tr>
                </tbody>
      </v-simple-table>
            </v-container>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Delivery Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-select
                  :items="delivery_company"
                  label="Select Delivery company"
                  v-model="selected_dcompany"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false; saveDelivery()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        orders: [],
        states: ['ordered', 'confirm', 'delivery', 'finish'],
        dialog: false,
        selected: null,
        delivery_company: [],
        selected_dcompany: null,
        deliver_company_list: [],
      }
    },
    created () {
      this.$http.get('/api/orders')
        .then((response) => {
          this.orders = response.data
          for (var i = 0; i < this.orders.length; i++) {
            if (this.orders[i].state === 0) this.orders[i].state = 'ordered'
            else if (this.orders[i].state === 1) this.orders[i].state = 'confirm'
            else if (this.orders[i].state === 2) this.orders[i].state = 'delivery'
            else if (this.orders[i].state === 3) this.orders[i].state = 'finish'
          }
        })
      this.$http.get('/api/delivery/kinds')
        .then((response) => {
          this.delivery_company_list = response.data
          for (var i = 0; i < response.data.length; i++) {
            this.delivery_company.push(response.data[i].dinfo)
          }
        })
    },
    methods: {
      save (index) {
        var changed
        if (this.orders[index].state === 'ordered') changed = 0
        else if (this.orders[index].state === 'confirm') changed = 1
        else if (this.orders[index].state === 'delivery') changed = 2
        else if (this.orders[index].state === 'finish') changed = 3
        if (changed === 2) {
          this.dialog = true
          this.selected = index
        } else {
          this.$http.post('/api/orders/saveState', { order_id: this.orders[index].order_id, state: changed })
            .then((response) => {
            })
        }
      },
      saveDelivery () {
        alert('save!! ' + this.selected + ', ' + this.selected_dcompany)
        console.log(this.delivery_company)
        var ck
        for (var i = 0; i < this.delivery_company_list.length; i++) {
          if (this.selected_dcompany === this.delivery_company_list[i].dinfo) {
            ck = i
            break
          }
        }
        var date = new Date()
        console.log('ck : ' + ck)
        this.$http.post('/api/delivery/add', { order_id: this.orders[this.selected].order_id, delivery_kind: ck, delivery_time: date.toISOString().slice(0, 19).replace('T', ' ') })
          .then((response) => {
            if (response.data.success) {
              this.$http.post('/api/orders/saveState', { order_id: this.orders[this.selected].order_id, state: 2 })
                .then((response) => {
                })
              alert(response.data.message)
            }
          })
      },
    },
  }
</script>
