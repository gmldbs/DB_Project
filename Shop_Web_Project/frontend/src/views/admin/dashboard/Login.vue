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
              Loginsadfasd
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    v-model="userId"
                    class="purple-input"
                    label="User ID"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="text-left"
                >
                  <v-btn
                    color="primary"
                    class="mr-0"
                    @click="dialog=true"
                  >
                    SignUp
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="text-right"
                >
                  <v-btn
                    color="info"
                    class="mr-0"
                    @click="login()"
                  >
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field label="User ID" v-model="sign_up_id" required></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field label="User Password" type="password" v-model="sign_up_password"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false; signUp()">Sign Up</v-btn>
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
        show: false,
        userId: '',
        password: '',
        dialog: false,
        genders: ['Man', 'Woman'],
        sign_up_id: null,
        sign_up_password: null,
        name: null,
        sex: null,
        email: null,
        phone: null,
        nickname: null,
        address: null,
      }
    },
    methods: {
      login: function () {
        this.$http.post('/api/users/login', {
          userid: this.userId,
          password: this.password,
        }).then(
          (res) => { // 로그인 성공
            alert('success')
            if (res.data.success) {
              this.$store.commit('SET_USER', res.data.user)
              if (this.$store.state.user.permission === 1) location.replace('/admin/dashboard')
              else location.replace('/Home')
            } else alert(res.data.message)
          },
          (err) => {
            alert(err)
          })
          .catch(err => {
            alert(err)
          })
      },
      signUp: function () {
        var sex
        if (this.sex === 'Man') sex = 'M'
        else sex = 'W'
        this.$http.post('/api/users/signUp', {
          id: this.sign_up_id,
          password: this.sign_up_password,
          name: this.name,
          sex: sex,
          email: this.email,
          phone: this.phone,
          nickname: this.nickname,
          address: this.address,
        }).then(
          (res) => {
            alert(res.data.message)
          },
        )
      },
    },
  }
</script>
