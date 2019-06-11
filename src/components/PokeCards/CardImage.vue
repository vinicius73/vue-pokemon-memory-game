<template>
  <figure class="image is-1by1"
    :style="style"
    :class="{ 'error': error }">
    <div class="placehold" v-if="!visible">
      <div>{{ placehold }}</div>
    </div>
    <div v-if="found || showLabel"
      class="label fade-in">
      <div>{{ identifier }}</div>
    </div>
  </figure>
</template>

<script>
import { getPattern } from '../../support/color'
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
    loading: true,
    error: true
  }),
  computed: {
    src () {
      return pokeDBSprite(this.identifier)
    },
    identifier () {
      const { pokemon } = this
      return pokemon.identifier || pokemon.id
    },
    showLabel () {
      return this.visible && (this.error || this.loading)
    },
    style () {
      const { src, visible, error, loading } = this

      if (loading) {
        return {}
      }

      if (error && visible) {
        return {
          'background-image': `${getPattern(this.identifier)}`
        }
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

    this.loading = true

    im.setAttribute('importance', 'high')

    im.onerror = () => {
      this.loading = false
      this.error = true
    }

    im.onload = () => {
      this.loading = false
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
    background-size: cover;
    .label {
      // background-color: #000;
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
