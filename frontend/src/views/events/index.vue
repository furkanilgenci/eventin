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
    ...mapActions(['getAllEvents']),
  },
  async created() {
    this.events = await this.getAllEvents()
  },
}
</script>

<template lang="pug">
div
  Header(title="All events" subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
  EventDisplay(:events="events" title="")
</template>
