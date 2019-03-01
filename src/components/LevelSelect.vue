<template>
  <div class="buttons has-addons">
    <a v-for="value in $options.levels" :key="value"
      class="button"
      @click="setLevel(value)">
      <span class="tag" :class="level===value ? 'is-danger' : 'is-black' " >{{ value*2 }}</span>
    </a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { isMobile } from '../support/utils'

const makeLevels = (base, length) => Array.from({ length }).map((_, index) => {
  return base * (index + 1)
})

export default {
  name: 'LevelSelect',
  // levels: [6, 9, 12, 18, 21, 24, 27, 30],
  // levels: [4, 8, 12, 16, 20, 24, 26, 30, 34],
  // levels: [7, 14, 21, 28, 35, 42, 49, 56, 63],
  levels: makeLevels(6, isMobile() ? 5 : 10),
  props: {
    value: Number
  },
  computed: {
    ...mapState(['level'])
  },
  methods: {
    ...mapActions(['setLevel'])
  }
}
</script>
