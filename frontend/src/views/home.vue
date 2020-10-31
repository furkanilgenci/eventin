<script>
import { mapActions } from 'vuex'

import HelloWorld from '@/components/hello-world.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return { users: 'null' }
  },
  async created() {
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
}
</script>

<template lang="pug">
.home
  hello-world(msg="Welcome to EventIn.")
  h2 {{ users }}
</template>
