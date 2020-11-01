<template lang="pug">
footer.bg-light
  .container
    ul
      li
        router-link(to="/") Home
      li
        router-link(to="/events") Events
    p
      | Designed and built with
      span
        | &nbsp;
        img(src="@/assets/icons/hearth.svg" height="15")
        | &nbsp;
      | by&nbsp;
      router-link(to="/") Event In
    p
      | Code licensed&nbsp;
      a(href="https://github.com/furkanilgenci/eventin/blob/main/LICENSE" target="_blank") MIT
      | .
</template>

<style lang="scss" scoped>
footer {
  padding: 2rem 1rem;
  text-align: center;
}
ul {
  padding-left: 0;
}
li {
  display: inline-block;
  &:not(:first-of-type) {
    margin-left: 1rem;
  }
}
</style>
