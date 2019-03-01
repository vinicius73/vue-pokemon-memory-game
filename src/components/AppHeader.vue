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
          <div class="tags has-addons">
            <span class="tag is-medium" :class="isRunning ? 'is-info' : 'is-black'">
              <b-icon icon="clock" />
            </span>
            <span class="tag is-medium mono" :class="isRunning ? 'is-info' : 'is-black'">
              {{ timer | secToTimeStr(false) }}
            </span>
            <a class="tag is-dark is-medium" title="Restart" @click="loadPokemon" v-if="isRunning">
              <b-icon icon="reload" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { sample } from 'lodash-es'
import { pokeApiSprite } from '../support/utils'
import { mapState, mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapState(['isRunning']),
    ...mapGetters(['isDone']),
    timerStatus () {
      return this.isRunning && !this.isDone
    },
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
    timerStatus: {
      immediate: true,
      handler  (value) {
        value
          ? this.startTimer()
          : this.stopTimer()
      }
    }
  },
  methods: {
    ...mapActions(['loadPokemon']),
    startTimer () {
      this.timer = 0
      this.$interval_timer = setInterval(() => {
        this.timer++
      }, 1000)
    },
    stopTimer () {
      clearInterval(this.$interval_timer)
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
