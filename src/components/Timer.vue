<template>
  <div class="tags has-addons">
    <span class="tag is-medium --icon-clock" v-if="!isMobile" :class="isRunning ? 'is-dark' : 'is-black'">
      <b-icon icon="clock" />
    </span>
    <span class="tag is-medium mono" :class="isRunning ? 'is-dark' : 'is-black'">
      {{ timer | secToTimeStr(false) }}
    </span>
    <span class="tag is-medium is-black --icon-counter" v-if="!isMobile">
      <b-icon icon="counter" />
    </span>
    <span class="tag is-medium mono is-black">
      {{ score | number }}
    </span>
    <a class="tag is-warning is-medium --btn-reload" title="Restart" @click="loadPokemon" v-if="isRunning && !isMobile">
      <b-icon icon="reload" />
    </a>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Visibility from 'visibilityjs'

export default {
  name: 'Timer',
  computed: {
    ...mapState(['isRunning', 'score', 'isMobile', 'timer']),
    ...mapGetters(['timerStatus'])
  },
  watch: {
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
    ...mapMutations({
      setTimer: 'set/timer'
    }),
    startTimer () {
      this.setTimer(0)
      this.$interval = Visibility.every(1000, () => {
        this.setTimer(this.timer + 1)
      })
    },
    stopTimer () {
      Visibility.stop(this.$interval)
    }
  },
  beforeDestroy () {
    this.stopTimer()
  }
}
</script>
