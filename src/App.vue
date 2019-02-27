<template>
  <div id="app">
    <div class="container">
      <AppHeader v-bind="{ isRunning }" @call:reload="loadData" />
      <hr>
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
        @done="onDone"
        :pokemon="list" />
      <AppFooter />
    </div>
    <b-loading is-full-page :active="isLoading" />
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import { isEmpty, map } from 'lodash-es'
import { randomIntList } from './support/utils'

const PokeCards = () => import(/* webpackChunkName: "poke-cards" */ './components/PokeCards.vue')

export default {
  name: 'AppShell',
  components: {
    PokeCards,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      isLoading: true,
      isRunning: false,
      isDone: false,
      error: '',
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
  methods: {
    onDone () {
      this.isRunning = false
      this.isDone = true
    },
    updateIndexes () {
      this.indexes = randomIntList(9, this.rawList.length - 1, 0)
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
  }
}
</script>
