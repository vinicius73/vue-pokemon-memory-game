<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img :src="logo" title="Pokémon" alt="Pokémon"> Memory Game
      </div>
    </div>
  </nav>
</template>

<script>
import { sample } from 'lodash-es'
import { pokeSprite } from '../support/utils'

const ids = [150, 25, 245, 6, 384, 94, 257, 658, 445, 742, 718, 319, 202, 725, 242, 748, 39]
const getPokemon = () => sample(ids)

export default {
  name: 'AppHeader',
  data () {
    return {
      pokemon: getPokemon()
    }
  },
  computed: {
    logo () {
      return pokeSprite(this.pokemon)
    }
  },
  mounted () {
    this.$interval = setInterval(() => {
      this.pokemon = getPokemon()
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.$interval)
  }
}
</script>

<style>
  .navbar-brand {
    font-family: monospace;
    font-weight: bold;
  }
</style>
