<script>
import { mapActions } from 'vuex'
import GoogleMap from '@/components/common/google-map.vue'

export default {
  components: {
    GoogleMap,
  },
  data() {
    return {
      event: {},
      weatherForecast: null,
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
  },
}
</script>

<template lang="pug">
div.bg-secondary.py-0.py-sm-4
  .container.bg-light.py-3
    .row.event-header
      .event-image.col-12.col-lg-7
        .fit-image-as-bg( :style="{'background-image': 'url(' + event.image + ')'}")
      .event-info.col-12.col-lg-5.bg-light
        h2 {{ event.title }}
        p {{ descriptionShort }}
    hr
    .event-body
      .row
        .col-12
          h3 Event details
          p {{ event.description }}
      .row
        .col-12
          .section-title
            img(src="@/assets/icons/eventin.svg" height="30")
            h6 Location:&nbsp;
            h6.text-primary {{ event.location ? event.location.address : '' }}
      .row.event-location-data
        .col-12.col-lg-6
          .section-title
            img(src="@/assets/icons/alarm.svg" height="30")
            h6 Time:&nbsp;
            h6.text-primary {{ dateDisplay }}
        .col-12.col-lg-6
          .section-title
            img(src="@/assets/icons/temp.svg" height="30")
            h6 Weather forecast:&nbsp;
            .spinner-grow.text-primary(role='status')
              span(v-show="weatherForecast !== null") {{ weatherForecast }}
            h6.text-primary {{ event.temperature }}
      GoogleMap(v-if="event.location" :location="event.location.address" width="100%" height="400px")
</template>

<style lang="scss" scoped>
.event-header {
  .event-image {
    display: flex;
    margin: auto;
    .fit-image-as-bg {
      height: 400px;
    }
  }
  .event-info {
    padding: 1.5rem;
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
.section-title {
  display: flex;
  align-items: center;
  h6,
  p {
    margin: 0;
  }
  img {
    margin-right: 0.5rem;
  }
}
</style>
