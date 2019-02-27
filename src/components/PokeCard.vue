<template lang="html">
  <div class="card" :class="{ 'is-spotlight': isFound }">
    <div class="card-image">
      <ImageFlip
        @click.native="onClick"
        v-bind="{ pokemon, placehold, visible }" />
    </div>
  </div>
</template>

<script>
import ImageFlip from './ImageFlip.vue'
import { includes, upperCase } from 'lodash-es'

export default {
  name: 'PokeCard',
  components: { ImageFlip },
  props: {
    index: Number,
    selecteds: Array,
    findings: Array,
    pokemon: Object
  },
  computed: {
    visible () {
      return this.isSelected || this.isFound
    },
    isSelected () {
      return includes(this.selecteds, this.pokemon.index)
    },
    isFound () {
      return includes(this.findings, this.pokemon.id)
    },
    placehold () {
      return upperCase(
        String.fromCharCode(97 + this.index)
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
