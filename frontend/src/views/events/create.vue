<script>
import Header from '@/components/common/header.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    Header,
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        time: '',
        location: '',
        organizer: '',
        image: null,
      },
      isSending: false,
      errorMessage: '',
    }
  },
  computed: {
    imagePreview() {
      if (!this.form.image) return null

      return URL.createObjectURL(this.form.image)
    },
  },
  methods: {
    ...mapActions(['postEvent']),
    handleFilePick(e) {
      this.form.image = e.target.files[0]
    },
    async handleSubmit() {
      this.isSending = true

      try {
        const { title, description, time, location, organizer, image } = this.form
        const doc = await this.postEvent({ title, description, time, location, organizer, image })

        this.$router.push(`/events/${doc._id}`)
      } catch (error) {
        if (error.isAxiosError && error.config.url.startsWith('https://api.imgur'))
          this.errorMessage = 'Image upload failed'
        else this.errorMessage = error.message
      }

      this.isSending = false
    },
  },
}
</script>

<template lang="pug">
div
  Header(title="Create an Event" subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
  section
    .container
      form(@submit.prevent="handleSubmit")
        .input-wrapper
          label.form-label(for="title") Event Title
          input#title.form-control(v-model="form.title" type="text" placeholder="Event title" required)
        .input-wrapper
          label.form-label(for="description") Event Description
          textarea#description.form-control( v-model="form.description" rows="4" placeholder="Event description..." required)
        .input-wrapper
          label.form-label(for="time") Time
          input#time.form-control(v-model="form.time" type="datetime-local" required)
        .input-wrapper
          label.form-label(for="organizer") Organizer
          input#organizer.form-control(v-model="form.organizer" type="text" placeholder="Event organizer" required)
        .input-wrapper
          label.form-label(for="location") Location
          input#location.form-control(v-model="form.location" placeholder="Full address, city or country" autocomplete="address" required)
        .input-wrapper
          label.form-label(for="image") Image (Max. 5MB)
          input#image.form-control(type="file" accept=".jpg, .jpeg, .png" @change="handleFilePick")
          img.image-preview(v-if='imagePreview' :src='imagePreview' alt="event image")
          img.image-preview(v-else src='@/assets/icons/image-placeholder.svg' alt="event image")
        .alert.alert-danger(role='alert' v-if="errorMessage")
          span Error:&nbsp;
          | {{ errorMessage }}.
        button.btn.btn-lg.btn-primary(type="submit" :disabled="isSending") Create
</template>

<style lang="scss" scoped>
form {
  max-width: 500px;
  margin: 0 auto;
  img.image-preview {
    max-width: 100%;
    height: 300px;
    margin: 1rem 0;
    border: 1px solid #cfcfcf;
    border-radius: 5px;
  }
  .input-wrapper {
    margin-bottom: 1rem;
  }
}
.alert span {
  font-weight: bold;
}
</style>
