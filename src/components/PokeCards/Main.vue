<template lang="html">
  <div class="poke-cards">
    <div class="poke-cards--header columns">
      <div class="column is-four-fifths">
        <slot />
      </div>
      <div class="column is-hidden-mobile">
        <!-- <div class="is-pulled-right tags has-addons">
          <span class="tag is-dark">Pokémon</span>
          <span class="tag is-info">{{ foundCount }}/{{ level }}</span>
        </div> -->

        <div class="field is-pulled-right">
            <b-switch type="is-danger" :value="isEasyMode" @input="setIsEasyMode">
                {{ isEasyMode ? 'Easy mode' : 'Normal mode' }}
            </b-switch>
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
        <Card
          @select="onSelect"
          v-bind="{ forceDisplay, selecteds }"
          :findings="found"
          :pokemon="row" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
import { Toast } from 'buefy/dist/components/toast'
import { throttle } from 'lodash-es'
import { mapGetters, mapActions, mapState } from 'vuex'

const getThemAll = () => {
  Toast.open({
    type: 'is-info',
    message: 'Get them all!'
  })
}

export default {
  name: 'PokeCards',
  components: { Card },
  data: () => ({
    forceDisplay: false
  }),
  computed: {
    ...mapGetters(['pokeCardsLists', 'foundCount']),
    ...mapState(['found', 'selecteds', 'level', 'isEasyMode'])
  },
  watch: {
    pokeCardsLists: 'bootstrap'
  },
  methods: {
    ...mapActions(['selectPokeCard', 'setIsEasyMode']),
    bootstrap: throttle(function bootstrap () {
      this.forceDisplay = false
      clearTimeout(this.$timeout)

      if (!this.isEasyMode) {
        return
      }

      this.$nextTick(() => {
        this.forceDisplay = true

        this.$timeout = setTimeout(() => {
          getThemAll()
          this.forceDisplay = false
        }, (this.level / 2) * 1000)
      })
    }, 1500),
    onSelect (pokemon) {
      if (!this.forceDisplay) {
        this.selectPokeCard(pokemon)
      }
    }
  },
  mounted () {
    this.bootstrap()
  }
}
</script>

<style>
  .poke-cards--header {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
