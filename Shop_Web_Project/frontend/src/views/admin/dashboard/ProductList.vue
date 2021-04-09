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
              Products
              <v-btn class="ma-2" outlined @click="dialog=true; addProduct()" style="float: right">ADD PRODUCT</v-btn>
            </div>
          </template>

          <v-card-text>
            <v-container class="pa-0" fluid>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text">
                      No.
                    </th>
                    <th class="primary--text">
                      PID
                    </th>
                    <th class="primary--text">
                      Name
                    </th>
                    <th class="primary--text">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, i) in products" :key="i">
                    <td>{{ i }}</td>
                    <td>{{ product.pid }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
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
          <span class="headline">Product Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field label="Product Name" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Product Price" v-model="price" hint="dollar unit"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="products_kind" label="Select Product Kind" v-model="kind" required></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Comment (Information of Products)" v-model="comment" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="Gender"
                  label="Gender"
                  v-model="gender"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false; saveProduct()">Save</v-btn>
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
        products: [],
        dialog: false,
        products_kind: [],
        Gender: ['Man', 'Woman', 'Man and Woman'],
        name: null,
        price: null,
        kind: null,
        comment: null,
        gender: null,
      }
    },
    created () {
      this.$http.get('/api/products')
        .then((response) => {
          this.products = response.data
        })
      this.$http.get('/api/products/kinds')
        .then((response) => {
          this.product_kind = response.data
          for (var i = 0; i < this.product_kind.length; i++) {
            this.products_kind.push(this.product_kind[i].name)
          }
        })
    },
    methods: {
      saveProduct () {
        var ck, ck2
        for (var i = 0; i < this.product_kind.length; i++) {
          if (this.kind === this.product_kind[i].name) ck = i
        }
        for (i = 0; i < this.Gender.length; i++) {
          console.log(this.kind + ' , ' + this.Gender[i])
          if (this.gender === this.Gender[i]) ck2 = i
        }
        console.log('ck = ' + ck)
        console.log('ck2 = ' + ck2)
        this.$http.post('/api/products/add', { name: this.name, price: this.price, kind: ck, comments: this.comment, gender: ck2 })
          .then((response) => {
            alert(response.data.message)
          })
      },
    },
  }
</script>
