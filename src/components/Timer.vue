<template>
  <div class="tags has-addons">
    <span class="tag is-medium" :class="isRunning ? 'is-dark' : 'is-black'">
      <b-icon icon="clock" />
    </span>
    <span class="tag is-medium mono" :class="isRunning ? 'is-dark' : 'is-black'">
      {{ timer | secToTimeStr(false) }}
    </span>
    <span class="tag is-medium is-black">
      <b-icon icon="counter" />
    </span>
    <span class="tag is-medium mono is-black">
      {{ score | number }}
    </span>
    <a class="tag is-warning is-medium" title="Restart" @click="loadPokemon" v-if="isRunning">
      <b-icon icon="reload" />
    </a>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Timer',
  data () {
    return {
      timer: 0
    }
  },
  computed: {
    ...mapState(['isRunning', 'score']),
    ...mapGetters(['isDone']),
    timerStatus () {
      return this.isRunning && !this.isDone
    }
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
    startTimer () {
      this.timer = 0
      this.$interval = setInterval(() => {
        this.timer++
      }, 1000)
    },
    stopTimer () {
      clearInterval(this.$interval)
    }
  },
  beforeDestroy () {
    this.stopTimer()
  }
}
</script>
