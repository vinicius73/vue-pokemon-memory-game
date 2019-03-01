<template fun>
  <b-notification
      v-if="hasError"
      v-on="$listeners"
      type="is-danger">
    <p>{{ error }}</p>
  </b-notification>
</template>

<script>
import { mapState } from 'vuex'
import { isEmpty } from 'lodash-es'

export default {
  name: 'AppError',
  computed: {
    ...mapState(['error']),
    hasError () {
      return !isEmpty(this.error)
    }
  }
}
</script>
