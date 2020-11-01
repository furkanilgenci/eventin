import { createStore } from 'vuex'
import axios from 'axios'

import uploadImage from '@/utils/imgur-upload.js'
import resolveLocation from '@/utils/google-resolve-location.js'

const API = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  withCredentials: true,
})

export default createStore({
  state: {
    GOOGLE_API_KEY: process.env.VUE_APP_GOOGLE_API_KEY,
    IMGUR_CLIENT_ID: process.env.VUE_APP_IMGUR_CLIENT_ID,
  },
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
    async getEventById(_, id) {
      return (await API.get(`/events/${id}`)).data
    },
    async postEvent({ state }, event) {
      const imgurResponse = (await uploadImage(event.image, state.IMGUR_CLIENT_ID)).data
      event.image = imgurResponse.data.link

      const googleGeolocationResponse = (await resolveLocation(event.location, state.GOOGLE_API_KEY)).data
      event.location = googleGeolocationResponse

      return (await API.post('/events', event)).data
    },
  },
  modules: {},
})
