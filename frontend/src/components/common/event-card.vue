<script>
export default {
  props: ['event', 'isPast'],
  computed: {
    dateDisplay() {
      if (!this.event.time) return ''

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(this.event.time).toLocaleDateString('en-UK', options)
    },
  },
}
</script>

<template lang="pug">
.card(:class="{ 'past-event-card': isPast }" )
  .fit-image-as-bg( :style="{'background-image': 'url(' + event.image + ')'}")
  .card-body
    h5.card-title.trim-overflow {{ event.title }}
    h6.text-primary.trim-overflow {{ dateDisplay }}
    p.card-text.trim-overflow {{ event.description }}
    router-link.btn.btn-primary(:to="`/events/${event._id}`") View
</template>

<style lang="scss" scoped>
.past-event-card {
  filter: grayscale(1);
}
.card {
  height: 370px;
  .card-body {
    height: 130px;
    display: flex;
    flex-direction: column;
    .btn {
      margin-top: auto;
      width: 5rem;
    }
  }
  .fit-image-as-bg {
    height: 200px;
  }
}

.trim-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  display: block;
}
</style>
