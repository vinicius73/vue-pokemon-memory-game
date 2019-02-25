<template>
  <div id="app">
    <div class="container is-fluid">
      <AppHeader />
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
