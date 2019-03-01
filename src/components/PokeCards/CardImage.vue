<template>
  <figure class="image is-1by1" :style="style">
    <!--  -->
  </figure>
</template>

<script>
import { pokeDBSprite } from '../../support/utils'

export default {
  name: 'ImageFlip',
  props: {
    pokemon: Object,
    visible: Boolean,
    placehold: String
  },
  data: () => ({
    error: false
  }),
  computed: {
    placeholdSrc () {
      return `https://placehold.jp/ffffff/000000/172x172.png?text=${this.placehold}`
    },
    src () {
      const { pokemon, error } = this

      if (error) {
        return `https://placehold.jp/ffffff/ff0000/172x172.png?text=${pokemon.identifier}`
      }

      return pokeDBSprite(pokemon.identifier)
    },
    style () {
      const src = this.visible
        ? this.src
        : this.placeholdSrc
      return {
        'background-image': `url(${src})`
      }
    }
  },
  mounted () {
    const im = new Image()

    im.onerror = () => {
      this.error = true
    }

    im.src = this.src
  }
}
</script>

<style lang="scss" scoped>
.image {
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transition: all .1s ease-in-out;
}
</style>
