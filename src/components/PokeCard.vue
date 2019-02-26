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
import { pokeSprite } from '../support/utils'
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
      return includes(this.selecteds, this.pokemon.index) || includes(this.findings, this.pokemon.id)
    },
    src () {
      if (this.pokemon.is_default === 1) {
        return pokeSprite(this.pokemon.id)
      }

      return `http://placehold.jp/ffffff/000000/150x150.png?text=${this.pokemon.identifier}`
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
