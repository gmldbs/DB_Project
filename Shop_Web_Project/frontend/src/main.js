// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import axios from 'axios'
import firebase from 'firebase'

Vue.config.productionTip = false
Vue.prototype.$http = axios
var firebaseConfig = {
    apiKey: "AIzaSyAyko8DJ9hbOMzY6UVDshCu3SuZe1bpUA4",
    authDomain: "bekoor6-c89f7.firebaseapp.com",
    databaseURL: "https://bekoor6-c89f7.firebaseio.com",
    projectId: "bekoor6-c89f7",
    storageBucket: "bekoor6-c89f7.appspot.com",
    messagingSenderId: "1022260724978",
    appId: "1:1022260724978:web:3e3c0db39a22ac003dfc6b",
    measurementId: "G-9ZCSDZGNNX"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
