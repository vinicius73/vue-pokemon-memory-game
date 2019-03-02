<template>
  <div class="buttons has-addons">
    <a v-for="value in levels"
      class="button is-outlined"
      :key="value"
      @click="setLevel(value)">
      <span class="tag" :class="level===value ? 'is-link' : 'is-black' " >{{ value*2 }}</span>
    </a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { makeLevels } from '../support/utils'

export default {
  name: 'LevelSelect',
  computed: {
    ...mapState(['level', 'isMobile']),
    levels () {
      return makeLevels(6, this.isMobile ? 4 : 10)
    }
  },
  methods: {
    ...mapActions(['setLevel'])
  }
}
</script>
