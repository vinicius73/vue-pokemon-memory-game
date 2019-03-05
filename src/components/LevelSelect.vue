<template>
  <div class="buttons has-addons">
    <slot />
    <a v-if="isMobile"
      class="button is-outlined"
      @click="loadPokemon">
      <b-icon type="is-danger" size="small" icon="reload" />
    </a>
    <a v-for="value in levels"
      class="button"
      :class="{ 'is-link': level===value }"
      :key="value"
      @click="setLevel(value)">
      <strong>{{ value * 2 }}</strong>
    </a>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'LevelSelect',
  computed: {
    ...mapState(['level', 'isMobile']),
    ...mapGetters(['levels'])
  },
  methods: {
    ...mapActions(['setLevel', 'loadPokemon']),
    select (level) {
      this.setLevel(level)

      this.$ga('send', {
        hitType: 'event',
        eventCategory: 'game',
        eventAction: 'level_select',
        eventLabel: `Select Level`,
        eventValue: level * 2,
        nonInteraction: true
      })
    }
  }
}
</script>
