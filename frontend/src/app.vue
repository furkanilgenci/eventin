<script>
import Navbar from '@/components/common/navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>

<template lang="pug">
#app
  Navbar
  router-view
</template>

<style lang="scss">
@import '@/assets/theme.scss';
@import 'bootstrap/scss/bootstrap.scss';
</style>
