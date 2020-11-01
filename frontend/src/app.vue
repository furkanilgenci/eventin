<script>
import Navbar from '@/components/common/navbar.vue'
import Footer from '@/components/common/footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<template lang="pug">
#app
  Navbar
  router-view
  Footer
</template>

<style lang="scss">
@import '@/assets/theme.scss';
@import 'bootstrap/scss/bootstrap.scss';
</style>
