<template>
  <div class="tags has-addons">
    <span class="tag is-medium" v-if="!isMobile" :class="isRunning ? 'is-dark' : 'is-black'">
      <b-icon icon="clock" />
    </span>
    <span class="tag is-medium mono" :class="isRunning ? 'is-dark' : 'is-black'">
      {{ timer | secToTimeStr(false) }}
    </span>
    <span class="tag is-medium is-black" v-if="!isMobile">
      <b-icon icon="counter" />
    </span>
    <span class="tag is-medium mono is-black" v-if="!isMobile">
      {{ score | number }}
    </span>
    <a class="tag is-warning is-medium" title="Restart" @click="loadPokemon" v-if="isRunning">
      <b-icon icon="reload" />
    </a>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Visibility from 'visibilityjs'

export default {
  name: 'Timer',
  data () {
    return {
      timer: 0
    }
  },
  computed: {
    ...mapState(['isRunning', 'score', 'isMobile']),
    ...mapGetters(['isDone']),
    timerStatus () {
      return this.isRunning && !this.isDone
    }
  },
  watch: {
    timer (value) {
      this.setTimer(value)
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
    ...mapMutations({
      setTimer: 'set/timer'
    }),
    startTimer () {
      this.timer = 0
      this.$interval = Visibility.every(1000, () => {
        this.timer++
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
