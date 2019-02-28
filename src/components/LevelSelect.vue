<template>
  <div class="field has-addons">
    <p class="control" v-for="level, index in $options.levels" :key="index">
      <a class="button" @click="$emit('input', level)">
        <span class="tag" :class="level===value ? 'is-danger' : 'is-black' " >{{ level*2 }}</span>
      </a>
    </p>
  </div>
</template>

<script>
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
  }
}
</script>
