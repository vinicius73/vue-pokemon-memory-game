<template lang="html">
  <div class="">
    <div class="columns" v-for="(list, index) in lists" :key="`row-${index}`">
      <div class="column" v-for="(row, rowIndex) in list" :key="`column-${rowIndex}-${row.id}`">
        <PokeCard :pokemon="row" />
      </div>
    </div>
  </div>
</template>

<script>
import PokeCard from './PokeCard.vue'
import { chunk } from 'lodash-es'

export default {
  name: 'PokeCards',
  components: { PokeCard },
  props: {
    pokemon: Array
  },
  computed: {
    lists () {
      return chunk(this.pokemon, 6)
    }
  }
}
</script>
