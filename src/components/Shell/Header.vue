<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item mono">
        <img :src="logo" title="Pokémon" alt="Pokémon" class="logo">
        <span v-if="isMobile">Memory Game</span>
        <span v-else>Pokémon - Memory Game</span>
      </div>
      <div class="navbar-item">
        <Timer class="is-pulled-right" v-if="isMobile" />
      </div>
    </div>
    <div class="navbar-menu" v-if="!isMobile">
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
import { mapState } from 'vuex'
import Timer from '../Timer.vue'
import Visibility from 'visibilityjs'

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
    ...mapState(['isMobile']),
    logo () {
      return pokeApiSprite(this.pokemon)
    }
  },
  watch: {
    logo (href) {
      this.$headIcons
        .forEach(el => {
          el.href = href
        })
    }
  },
  created () {
    this.$headIcons = document.querySelectorAll('link[rel=icon')
  },
  mounted () {
    this.$interval = Visibility.every(10000, () => { // 10s
      this.pokemon = getPokemon()
    })
  },
  beforeDestroy () {
    Visibility.stop(this.$interval)
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
