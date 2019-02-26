<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item mono">
        <img :src="logo" title="Pokémon" alt="Pokémon" class="logo"> Memory Game
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end" v-if="isRunning">
        <div class="navbar-item mono">
          {{ timer }}s
        </div>
        <div class="navbar-item">
          <button class="button is-dark" title="Restart" @click="reload">
            <b-icon icon="reload" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { sample } from 'lodash-es'
import { pokeApiSprite } from '../support/utils'

const ids = [150, 25, 245, 6, 384, 94, 257, 658, 445, 742, 718, 319, 202, 725, 242, 748, 39]
const getPokemon = () => sample(ids)

export default {
  name: 'AppHeader',
  data () {
    return {
      pokemon: getPokemon(),
      timer: 0
    }
  },
  props: {
    isRunning: Boolean
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
    },
    isRunning: {
      immediate: true,
      handler  (value) {
        value
          ? this.startTimer()
          : this.stopTimer()
      }
    }
  },
  methods: {
    startTimer () {
      this.$interval_timer = setInterval(() => {
        this.timer++
      }, 1000)
    },
    stopTimer () {
      clearInterval(this.$interval_timer)
      this.$nextTick(() => {
        this.timer = 0
      })
    },
    reload () {
      this.$emit('call:reload')
    }
  },
  mounted () {
    this.$interval_nextPokemon = setInterval(() => {
      this.pokemon = getPokemon()
    }, 10000) // 10s
  },
  beforeDestroy () {
    this.stopTimer()
    clearInterval(this.$interval_nextPokemon)
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
