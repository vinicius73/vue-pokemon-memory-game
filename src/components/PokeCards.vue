<template lang="html">
  <div class="">
    <div
      class="columns"
      v-for="(list, index) in lists"
      :key="`row-${index}`">
      <div
        class="column"
        v-for="(row, rowIndex) in list"
        :key="`column-${rowIndex}-${row.id}`">
        <PokeCard
          @select="onSelect"
          :index="row.index"
          :selecteds="selectedsKeys"
          :findings="findingsIds"
          :pokemon="row" />
      </div>
    </div>
  </div>
</template>

<script>
import PokeCard from './PokeCard.vue'
import { chunk, includes, map, find, size, toUpper, shuffle } from 'lodash-es'
import { Snackbar } from 'buefy/dist/components/snackbar'

export default {
  name: 'PokeCards',
  components: { PokeCard },
  data () {
    return {
      selectedsKeys: [],
      findingsIds: []
    }
  },
  props: {
    pokemon: Array
  },
  computed: {
    rawList () {
      const { pokemon } = this
      return shuffle([...pokemon, ...pokemon])
        .map((row, index) => {
          return {
            ...row,
            index
          }
        })
    },
    lists () {
      return chunk(this.rawList, 6)
    },
    selecteds () {
      return map(this.selectedsKeys, index => {
        return find(this.rawList, row => {
          return row.index === index
        })
      })
    },
    isDone () {
      return size(this.findingsIds) === size(this.pokemon)
    }
  },
  watch: {
    isDone: 'onDone',
    pokemon: 'reset',
    selecteds (values) {
      if (size(values) === 2) {
        const [pokeA, pokeB] = values
        if (pokeA.id === pokeB.id) {
          this.findingsIds = [...this.findingsIds, pokeA.id]
          Snackbar.open({
            position: 'is-top',
            message: `You find ${toUpper(pokeA.identifier)}!`
          })
        } else {
          Snackbar.open({
            type: 'is-warning',
            position: 'is-top',
            message: 'Try again!'
          })
        }

        setTimeout(() => {
          this.selectedsKeys = []
        }, 1000)
      }
    }
  },
  methods: {
    reset () {
      Object.assign(this, this.$options.data.call(this))
    },
    onDone (value) {
      if (!value) {
        return
      }

      this.$emit('done')
    },
    onSelect ({ id, index }) {
      if (includes(this.findingsIds, id)) {
        return
      }

      const selecteds = [...this.selectedsKeys]

      if (includes(selecteds, index)) {
        return
      }

      this.selectedsKeys = [...selecteds, index]
    }
  }
}
</script>
