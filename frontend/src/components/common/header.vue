<script>
export default {
  props: ['title', 'subtext'],
}
</script>

<template lang="pug">
section
  .container
    h1 {{ title }}
    p {{ subtext }}
</template>

<style lang="scss" scoped>
h1 {
  font-weight: bold;
}

.container {
  text-align: center;
}
</style>
