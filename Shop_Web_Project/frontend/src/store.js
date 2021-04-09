import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    user: {
      id: '',
      email: '',
      name: '',
      nickname: '',
      password: '',
      permission: 0,
      phone: '',
      sex: '',
      uid: 0,
    },
    selectedPid: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_PID (state, payload) {
      state.selectedPid = payload
    },
  },
  actions: {

  },
})
