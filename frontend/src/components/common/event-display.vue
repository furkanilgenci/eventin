<script>
import EventCard from '@/components/common/event-card.vue'

export default {
  components: {
    EventCard,
  },
  props: {
    title: String,
    events: Array,
  },
  data() {
    return {
      now: Date.now()
    }
  }
}
</script>

<template lang="pug">
section
  .container
    h3 {{ title }}
    .row(v-if="events.length > 0")
      .col-xl-3.col-lg-4.col-md-6.col-sm-12(v-for="event in events")
        EventCard(:event="event" :isPast="this.now > (new Date(event.time).getTime())" :key="event._id")
    .no-event(v-else) No event found.
</template>

<style lang="scss" scoped>
.row > * {
  padding: 1rem;
}
.no-event {
  height: 8rem;
  padding: 1rem 0.3rem;
}
</style>
