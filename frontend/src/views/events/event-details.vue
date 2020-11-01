<script>
import { mapActions } from 'vuex'
import GoogleMap from '@/components/common/google-map.vue'
import fetchWeatherForecast from '@/utils/met-no-fetch-weather.js'

export default {
  components: {
    GoogleMap,
  },
  data() {
    return {
      event: {},
      weatherForecast: {},
    }
  },
  computed: {
    descriptionShort() {
      if (!this.event.description) return ''

      return `${this.event.description
        .split(/\s+/)
        .slice(0, 20)
        .join(' ')}...`
    },
    dateDisplay() {
      if (!this.event.time) return ''

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' }
      return new Date(this.event.time).toLocaleDateString('en-UK', options)
    },
  },
  methods: {
    ...mapActions(['getEventById']),
  },
  async created() {
    this.event = await this.getEventById(this.$route.params.id)
    this.weatherForecast = await fetchWeatherForecast(this.event.location.coordinates, this.event.time)
  },
}
</script>

<template lang="pug">
div.bg-secondary.py-0.py-sm-4
  .container.bg-light.py-3
    .row.event-header
      .event-image-wrapper.col-12.col-lg-7
        .fit-image-as-bg( :style="{'background-image': 'url(' + event.image + ')'}")
      .event-info.col-12.col-lg-5.bg-light
        h2 {{ event.title }}
        p {{ descriptionShort }}
        h6.text-primary.event-organizer {{ event.organizer }}
    hr
    .event-body
      .row
        .col-12
          h3 Event details
          p {{ event.description }}
      .row.event-location-data
        .col-12.col-lg-6
          .property-section
            img(src="@/assets/icons/alarm.svg")
            h6 Time:&nbsp;
            h6.text-primary {{ dateDisplay }}
        .col-12.col-lg-6
          .property-section
            img(v-if="weatherForecast.image === null" src="@/assets/icons/temp.svg")
            img.weather-img(v-else :src="weatherForecast.image")
            h6 On Event Day:&nbsp;
            .spinner-grow.text-primary(role='status' v-if="weatherForecast.text === null")
            .forecast(v-else)
              h6.text-primary {{ weatherForecast.text }}
      .row
        .col-12
          .property-section
            img(src="@/assets/icons/eventin.svg")
            h6 Location:&nbsp;
            h6.text-primary {{ event.location ? event.location.address : '' }}
      GoogleMap(v-if="event.location" :location="event.location.address" width="100%" height="400px")
</template>

<style lang="scss" scoped>
.event-header {
  .event-image-wrapper {
    display: flex;
    margin: auto;
    .fit-image-as-bg {
      height: 400px;
    }
  }
  .event-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;

    .event-organizer {
      margin-top: auto;
    }
  }
}
.event-body {
  padding: 0 3rem;
  & > * {
    padding: 1rem 0;
  }
  .event-location-data {
    padding-top: 0;
    & > * {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }
}
.property-section {
  img,
  h6,
  p {
    margin-bottom: 0.5rem;
  }
  img {
    height: 30px;
  }
}
</style>
