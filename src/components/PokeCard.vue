<template lang="html">
  <div class="card">
    <div class="card-image">
      <ImageFlip
        @click.native="onClick"
        v-bind="{ src, placehold, visible }" />
    </div>
  </div>
</template>

<script>
import ImageFlip from './ImageFlip.vue'
import { includes } from 'lodash-es'

export default {
  name: 'PokeCard',
  components: { ImageFlip },
  props: {
    selecteds: Array,
    findings: Array,
    pokemon: Object
  },
  computed: {
    visible () {
      return includes(this.selecteds, this.pokemon.index) || includes(this.findings, this.pokemon.id)
    },
    src () {
      if (this.pokemon.is_default === 1) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`
      }

      return `http://placehold.jp/ffffff/000000/150x150.png?text=${this.pokemon.identifier}`
    },
    placehold () {
      return this.pokemon.identifier
    }
  },
  methods: {
    onClick (e) {
      this.$emit('select', this.pokemon)
    }
  }
}
</script>
