<template>
  <figure class="image is-1by1"
    :style="style"
    :class="{ 'has-background-warning error': visible && error }">
    <div class="placehold" v-if="!visible">
      <div>{{ placehold }}</div>
    </div>
    <div v-if="found || (visible && error)"
      class="label fade-in">
      <div>{{ pokemon.identifier || pokemon.id }}</div>
    </div>
  </figure>
</template>

<script>
import { pokeDBSprite } from '../../support/utils'

export default {
  name: 'ImageFlip',
  props: {
    pokemon: Object,
    visible: Boolean,
    found: Boolean,
    placehold: String
  },
  data: () => ({
    error: true
  }),
  computed: {
    src () {
      return pokeDBSprite(this.pokemon.identifier)
    },
    style () {
      const { src, visible, error } = this

      if (error) {
        return {}
      }

      const image = visible
        ? src
        : '/img/1x1.png'

      return {
        'background-image': `url(${image})`
      }
    }
  },
  mounted () {
    const im = new Image()

    im.onerror = () => {
      this.error = true
    }

    im.onload = () => {
      this.error = false
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
  &.error {
    .label {
      background-color: #000;
    }
  }
  .placehold {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-size: 1.5rem;
  }
  .label {
    padding: 0.3rem 0;
    text-transform: uppercase;
    background-color: #ee151590;
    color: #FFF;
    font-family: monospace;
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0
  }
}
</style>
