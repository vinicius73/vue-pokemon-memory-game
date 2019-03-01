<template lang="html">
  <div class="poke-cards">
    <div class="poke-cards--header columns">
      <div class="column is-four-fifths">
        <slot />
      </div>
      <div class="column is-hidden-mobile">
        <div class="is-pulled-right tags has-addons">
          <span class="tag is-dark">Pokémon</span>
          <span class="tag is-info">{{ foundCount }}/{{ level }}</span>
        </div>
      </div>
    </div>
    <div
      class="columns is-mobile is-variable is-1"
      v-for="(list, index) in pokeCardsLists"
      :key="`row-${index}`">
      <div
        class="column"
        v-for="(row, rowIndex) in list"
        :key="`column-${rowIndex}-${row.id}`">
        <PokeCard
          @select="onSelect"
          :selecteds="selecteds"
          :findings="found"
          :pokemon="row" />
      </div>
    </div>
  </div>
</template>

<script>
import PokeCard from './PokeCard.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'PokeCards',
  components: { PokeCard },
  computed: {
    ...mapGetters(['pokeCardsLists', 'foundCount']),
    ...mapState(['found', 'selecteds', 'level'])
  },
  watch: {
  },
  methods: {
    ...mapActions(['selectPokeCard']),
    onSelect (pokemon) {
      this.selectPokeCard(pokemon)
    }
  }
}
</script>

<style>
  .poke-cards--header {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
