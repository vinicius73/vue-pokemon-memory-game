<template>
  <b-notification
    has-icon
    v-if="isDone"
    v-on="$listeners"
    type="is-success">
    <p>Congratulations, you got them all!</p>
    <p>Thanks for playing!</p>
  </b-notification>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AlertDone',
  computed: {
    ...mapGetters(['isDone'])
  }
}
</script>
