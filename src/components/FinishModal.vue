<template>
  <div class="modal-card" style="width: 350px" ref="root">
    <header class="modal-card-head has-background-danger">
      <p class="modal-card-title has-text-light">You got them all!!</p>
    </header>
    <section class="modal-card-body">
      <Pokeball />

      <h3>Pokémon - Memory Game</h3>

      <hr />

      <div class="control">
        <div class="tags has-addons are-large">
          <span class="tag is-black">
            <b-icon icon="bullseye-arrow" />
          </span>
          <span class="tag is-black">Level</span>
          <span class="tag is-warning">
            {{ levelCount }}
          </span>
          <span v-if="isEasyMode" class="tag is-warning">
            <b-icon icon="alpha-e" type="is-danger" />
          </span>
        </div>

        <div class="tags has-addons are-large">
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

        <div class="tags has-addons are-large">
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
  </div>
</template>

<script>
import Pokeball from './Pokeball.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'FinishModal',
  components: { Pokeball },
  computed: {
    ...mapGetters(['levelCount']),
    ...mapState(['score', 'level', 'timer', 'isEasyMode']),
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
  mounted () {
    if (!window.ga) {
      return
    }

    window.ga('set', 'dimension0', 'time')

    window.ga('send', {
      hitType: 'event',
      eventCategory: 'game',
      eventAction: 'finish',
      eventLabel: `Finish level ${this.level * 2}`,
      eventValue: this.score,
      metric0: this.time,
      nonInteraction: true
    })
  }
}
</script>

<style scoped>
  .modal-card-title, h3 {
    text-align: center;
    font-family: monospace;
    font-weight: bold;
  }
  h3 {
    font-size: 1.5rem;
  }
</style>
