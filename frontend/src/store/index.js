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
    async getAllEvents() {
      return (await API.get('/events/all')).data.sort((a, b) => {
        const dateA = new Date(a.time)
        const dateB = new Date(b.time)

        return dateB - dateA
      })
    },
    async getUpcomingEvents({ dispatch }) {
      const events = await dispatch('getAllEvents')

      events.sort((a, b) => {
        const dateA = new Date(a.time)
        const dateB = new Date(b.time)

        return dateA - dateB
      })

      const now = Date.now()

      return events.filter(ev => {
        const date = new Date(ev.time)
        return date > now
      })
    },
  },
  modules: {},
})
