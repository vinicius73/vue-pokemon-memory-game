<template lang="html">
  <div class="card" :class="{ 'is-spotlight': isFound }">
    <div class="card-image">
      <CardImage
        @click.native="onClick"
        v-bind="{ pokemon, placehold, visible }" />
    </div>
  </div>
</template>

<script>
import CardImage from './CardImage.vue'
import { includes, upperCase } from 'lodash-es'

export default {
  name: 'PokeCard',
  components: { CardImage },
  props: {
    selecteds: Array,
    findings: Array,
    pokemon: Object,
    forceDisplay: Boolean
  },
  computed: {
    visible () {
      return this.forceDisplay || this.isSelected || this.isFound
    },
    isSelected () {
      return includes(this.selecteds, this.pokemon.index)
    },
    isFound () {
      return includes(this.findings, this.pokemon.id)
    },
    placehold () {
      const { index } = this.pokemon
      if (index > 25) {
        const letter = index % 26
        const base = Math.floor(index / 26) - 1

        return upperCase(
          String.fromCharCode(97 + base) + String.fromCharCode(97 + letter)
        )
      }

      return upperCase(
        String.fromCharCode(97 + index)
      )
    }
  },
  methods: {
    onClick (e) {
      this.$emit('select', this.pokemon)
    }
  }
}
</script>
