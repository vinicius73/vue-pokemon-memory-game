<template>
  <div class="modal-card" style="max-width: 400px" ref="root">
    <header class="modal-card-head has-background-danger">
      <p class="modal-card-title has-text-light">You got them all!!</p>
    </header>
    <section class="modal-card-body">
      <Pokeball />

      <h3>Pokémon - Memory Game</h3>

      <hr />

      <div class="control">
        <div class="tags has-addons are-medium">
          <span class="tag is-black">
            <b-icon icon="bullseye-arrow" />
          </span>
          <span class="tag is-black">Level</span>
          <span class="tag is-warning">
            {{ levelCount }}
          </span>
          <span v-if="isEasyMode" class="tag is-warning">
            <b-icon icon="baby-buggy" type="is-danger" />
          </span>
          <span v-if="isRouletteMode" class="tag is-warning">
            <b-icon icon="shuffle-variant" type="is-danger" />
          </span>
        </div>

        <div class="tags has-addons are-medium">
          <span class="tag is-black">
            <b-icon icon="counter" />
          </span>
          <span class="tag is-black">Score</span>
          <span class="tag is-link">{{ score | number }}</span>
          <span class="tag is-link">
            <b-icon icon="chart-line-variant" />
          </span>
          <span class="tag is-link">{{ scoreAvg | number }}</span>
        </div>

        <div class="tags has-addons are-medium">
          <span class="tag is-black">
            <b-icon icon="clock" />
          </span>
          <span class="tag is-black">Time</span>
          <span class="tag is-info">{{ timer | secToTimeStr(false) }}</span>
          <span class="tag is-info">
            <b-icon icon="chart-line-variant" />
          </span>
          <span class="tag is-info">{{ timerAvg | number }}</span>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="reload">
        <b-icon icon="reload" /> <span>Restart</span>
      </button>
    </footer>
  </div>
</template>

<script>
import Pokeball from './Pokeball.vue'
import { filter } from 'lodash-es'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'FinishModal',
  components: { Pokeball },
  computed: {
    ...mapGetters(['levelCount']),
    ...mapState(['score', 'level', 'timer', 'isEasyMode', 'isRouletteMode']),
    scoreAvg () {
      const { level, score } = this
      if (score <= 0 || level <= 0) {
        return 0
      }

      return score / level
    },
    timerAvg () {
      const { timer, score } = this
      if (score <= 0 || timer <= 0) {
        return 0
      }

      return score / timer
    }
  },
  methods: {
    ...mapActions(['loadPokemon']),
    reload () {
      this.loadPokemon()
      this.$nextTick(() => {
        this.$parent.close()
      })
    }
  },
  mounted () {
    this.$ga('set', 'dimension0', 'time')
    this.$ga('set', 'dimension1', 'easy mode')
    this.$ga('set', 'dimension2', 'roulette mode')

    this.$ga('set', 'metric0', 'time')
    this.$ga('set', 'metric1', 'easy mode')
    this.$ga('set', 'metric2', 'roulette mode')

    const { isEasyMode, level, score, time, isRouletteMode } = this

    const mode = filter([
      isEasyMode ? 'easy' : 'normal',
      isRouletteMode ? 'roulette' : ''
    ], val => !!val)

    this.$ga('send', {
      hitType: 'event',
      eventCategory: 'game',
      eventAction: `finish-${mode}`,
      eventLabel: `Finish level ${level * 2}`,
      eventValue: score,
      metric0: time,
      metric1: isEasyMode ? 1 : 0,
      metric2: isRouletteMode ? 1 : 0,
      nonInteraction: true
    })
  }
}
</script>

<style scoped>
  h3 {
    font-size: 1.5rem;
  }
  .modal-card-title, h3 {
    text-align: center;
    font-family: monospace;
    font-weight: bold;
  }
  .modal-card-foot {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
