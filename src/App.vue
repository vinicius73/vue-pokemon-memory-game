<template>
  <div id="app">
    <div class="container is-fluid">
      <AppHeader />
      <hr>
      <b-notification
        has-icon
        @close="loadData"
        v-if="hasError"
        type="is-danger">
        <p>{{ error }}</p>
      </b-notification>
      <PokeCards :pokemon="list" />
      <AppFooter />
    </div>
    <b-loading is-full-page :active="isLoading" />
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import PokeCards from './components/PokeCards.vue'
import { shuffle, isEmpty } from 'lodash-es'
import { randomIntList } from './support/utils'

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
      const baseList = this.indexes.map(index => {
        return this.rawList[index]
      })

      return shuffle([...baseList, ...baseList])
        .map((row, index) => {
          return {
            ...row,
            index
          }
        })
    }
  },
  methods: {
    updateIndexes () {
      this.indexes = randomIntList(9, this.rawList.length, 0)
    },
    loadData () {
      this.isLoading = true
      this.error = ''
      fetch('/pokemon.json')
        .then(response => response.json())
        .then(data => {
          this.rawList = data
          this.updateIndexes()
          this.$nextTick(() => {
            this.isLoading = false
          })
        })
        .catch((err) => {
          this.error = err.message
          this.isLoading = false
          console.error('Failed retrieving information', err)
        })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
