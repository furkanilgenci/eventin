import { createStore } from 'vuex'
import axios from 'axios'

const API = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  withCredentials: true,
  timeout: 1000,
})

export default createStore({
  state: {},
  mutations: {},
  actions: {
    async fetchUsers() {
      return (await API.get('/users')).data
    },
  },
  modules: {},
})
