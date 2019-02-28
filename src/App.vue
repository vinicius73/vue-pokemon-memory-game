<template>
  <div id="app">
    <div class="container is-fluid">
      <AppHeader v-bind="{ isRunning }" @call:reload="loadData" />

      <b-notification
        has-icon
        @close="loadData"
        v-if="hasError"
        type="is-danger">
        <p>{{ error }}</p>
      </b-notification>

      <b-notification
        has-icon
        @close="loadData"
        v-if="isDone"
        type="is-success">
        <p>
          Congratulations, you got them all!
        </p>
      </b-notification>

      <PokeCards
        id="main"
        @done="onDone"
        :pokemon="list">
        <LevelSelect v-model="level" />
      </PokeCards>
      <AppFooter />
    </div>
    <b-loading is-full-page :active="isLoading" />
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import LevelSelect from './components/LevelSelect.vue'
import { isEmpty, map } from 'lodash-es'
import { randomIntList } from './support/utils'
import { Snackbar } from 'buefy/dist/components/snackbar'

const PokeCards = () => import(/* webpackChunkName: "poke-cards" */ './components/PokeCards.vue')

export default {
  name: 'AppShell',
  components: {
    PokeCards,
    LevelSelect,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      isLoading: true,
      isRunning: false,
      isDone: false,
      error: '',
      level: 6,
      rawList: [],
      indexes: []
    }
  },
  computed: {
    hasError () {
      return !isEmpty(this.error)
    },
    list () {
      return map(this.indexes, index => {
        return this.rawList[index]
      })
    }
  },
  watch: {
    level () {
      this.isRunning = false
      this.isLoading = true

      this.updateIndexes()

      setTimeout(() => {
        this.isRunning = true
        this.isLoading = false
      }, 1000)
    }
  },
  methods: {
    onDone () {
      this.isRunning = false
      this.isDone = true
    },
    updateIndexes () {
      this.indexes = randomIntList(this.level, this.rawList.length - 1, 0)
    },
    loadData () {
      this.isLoading = true
      this.isRunning = false
      this.isDone = false
      this.error = ''

      import(/* webpackChunkName: "pokemon-data" */'./assets/pokemon.json')
        .then(module => Object.values(module))
        .then(data => {
          this.rawList = data
          this.updateIndexes()
          this.$nextTick(() => {
            this.isLoading = false
            this.isRunning = true
          })
        })
        .catch((err) => {
          this.error = err.message
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.loadData()
  },
  created () {
    document.addEventListener('sw:update', () => {
      const reload = () => document.location.reload(true)

      Snackbar.open({
        message: 'There is an update available.',
        actionText: 'Reload Now',
        type: 'is-warning',
        indefinite: true,
        onAction: reload
      })
    })
  }
}
</script>

<style>
  #main {
    /* margin-top: 10px; */
  }
</style>
