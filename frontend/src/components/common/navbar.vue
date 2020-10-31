<script>
export default {}
</script>

<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-light.bg-light.py-lg-4.py-2
  .container
    router-link.navbar-brand.mb-0.h1(to="/")
      img(src="@/assets/icons/eventin.svg" height="25")
      | Event In
    button.navbar-toggler(type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation")
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.ml-auto.mb-2.mb-lg-0.mr-4
        li.nav-item
          router-link.nav-link(aria-current="page" to="/") Home
        li.nav-item
          router-link.nav-link(to="/events") Events
      router-link.btn.btn-warning.my-3.my-lg-0(to="/events/create")
        img(src="@/assets/icons/create.svg" height="20")
        span Create Event
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
}
.btn-search > img,
.navbar-brand > img {
  margin-right: 0.5rem;
}
</style>
