<template>
  <div id="app">
    <div class="container is-fluid">
      <AppHeader />

      <AppAlertError @close="loadPokemon" />
      <AppAlertDone @close="loadPokemon" />

      <PokeCards id="main">
        <LevelSelect />
      </PokeCards>

      <AppFooter />
    </div>
    <b-loading is-full-page :active="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppFooter from './components/AppFooter.vue'
import AppAlertError from './components/AppAlertError.vue'
import AppAlertDone from './components/AppAlertDone.vue'
import AppHeader from './components/AppHeader.vue'
import LevelSelect from './components/LevelSelect.vue'
import { Snackbar } from 'buefy/dist/components/snackbar'

const PokeCards = () => import(/* webpackChunkName: "poke-cards" */ './components/PokeCards.vue')

export default {
  name: 'AppShell',
  components: {
    PokeCards,
    LevelSelect,
    AppHeader,
    AppAlertDone,
    AppAlertError,
    AppFooter
  },
  computed: {
    ...mapState(['error', 'isLoading'])
  },
  methods: {
    ...mapActions(['loadPokemon'])
  },
  mounted () {
    this.loadPokemon()
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
