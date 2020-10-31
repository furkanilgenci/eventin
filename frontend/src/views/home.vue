<script>
import { mapActions } from 'vuex'

import Header from '@/components/common/header.vue'
import EventDisplay from '@/components/common/event-display.vue'

export default {
  components: {
    Header,
    EventDisplay,
  },
  data() {
    return {
      events: [],
    }
  },
  methods: {
    ...mapActions(['getUpcomingEvents']),
  },
  async created() {
    this.events = await this.getUpcomingEvents()
  },
}
</script>

<template lang="pug">
div
  Header(title="Organize and join events, real fast." subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
  EventDisplay(title="Nearest events", :events="events")
  section.container.see-all-wrapper
    router-link.btn.btn-lg.btn-primary(to="/events") See all events
</template>

<style lang="scss" scoped>
.see-all-wrapper {
  display: flex;
  & > * {
    margin: 0 auto;
  }
}
</style>
