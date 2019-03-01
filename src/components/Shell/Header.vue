<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item mono">
        <img :src="logo" title="Pokémon" alt="Pokémon" class="logo"> Pokémon - Memory Game
      </div>
      <slot />
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <Timer />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { sample } from 'lodash-es'
import { pokeApiSprite } from '../../support/utils'
import Timer from '../Timer.vue'

const ids = [150, 25, 245, 6, 384, 94, 257, 658, 445, 742, 718, 319, 202, 725, 242, 748, 39]
const getPokemon = () => sample(ids)

export default {
  name: 'ShellHeader',
  components: { Timer },
  data () {
    return {
      pokemon: getPokemon()
    }
  },
  computed: {
    logo () {
      return pokeApiSprite(this.pokemon)
    }
  },
  watch: {
    logo (href) {
      document.querySelectorAll('link[rel=icon')
        .forEach(el => {
          el.href = href
        })
    }
  },
  mounted () {
    this.$interval = setInterval(() => {
      this.pokemon = getPokemon()
    }, 10000) // 10s
  },
  beforeDestroy () {
    clearInterval(this.$interval)
  }
}
</script>

<style>
  .logo {
    max-height: 3rem !important;
  }
  .mono {
    font-family: monospace;
    font-weight: bold;
  }
</style>
