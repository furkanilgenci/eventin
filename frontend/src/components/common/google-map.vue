<script>
import { mapState } from 'vuex'

export default {
  props: ['location', 'width', 'height'],
  computed: {
    ...mapState(['GOOGLE_API_KEY']),
    link() {
      return `https://www.google.com/maps/embed/v1/place?key=${this.GOOGLE_API_KEY}&q=${this.location}`
    },
  },
}
</script>

<template>
  <iframe :width="width" :height="height" frameborder="0" style="border:0" :src="link"> </iframe>
</template>
