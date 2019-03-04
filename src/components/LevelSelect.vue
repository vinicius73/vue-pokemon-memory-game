<template>
  <div class="buttons has-addons">
    <a class="button is-outlined" v-if="isMobile" @click="loadPokemon">
      <b-icon type="is-danger" size="small" icon="reload" />
    </a>
    <a v-for="value in levels"
      class="button"
      :class="{ 'is-link': level===value }"
      :key="value"
      @click="setLevel(value)">
      <!-- <span class="tag is-small" :class="level===value ? 'is-link' : 'is-black' " >{{ value*2 }}</span> -->
      <strong>{{ value * 2 }}</strong>
    </a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { makeLevels } from '../support/utils'

export default {
  name: 'LevelSelect',
  computed: {
    ...mapState(['level', 'isMobile']),
    levels () {
      return makeLevels(6, this.isMobile ? 4 : 10)
    }
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
