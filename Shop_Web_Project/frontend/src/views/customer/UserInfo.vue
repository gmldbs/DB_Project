<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    class="purple-input"
                    label="User Id"
                    v-model="user.id"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    class="purple-input"
                    label="Phone Number"
                    v-model="user.phone"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    v-model="user.email"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <!--v-text-field
                    label="Gender"
                    class="purple-input"
                    v-model="user.sex"
                  /-->
                  <v-select :items="gender" v-model="userSex" label="Solo field" solo></v-select>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    label="Name"
                    class="purple-input"
                    v-model="user.name"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Address"
                    class="purple-input"
                    v-model="user.address"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="update_profile()"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
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
        user: [],
        gender: ['Man', 'Woman'],
        userSex: null,
      }
    },
    created () {
      this.user = this.$store.state.user
      if (this.user.permission === 0) {
        alert('Do Login First!')
        this.$router.push('/Home')
      }
      if (this.user.sex === 'M') this.userSex = 'Man'
      else this.userSex = 'Woman'
    },
    methods: {
      update_profile () {
        if (this.userSex === 'Man') this.user.sex = 'M'
        else if (this.userSex === 'Woman') this.user.sex = 'W'
        this.$http.post('/api/users/update', { user: this.user })
          .then((response) => {
            alert(response.data.message)
            console.log(response)
          })
      },
    },
  }
</script>
