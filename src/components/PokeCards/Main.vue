<template lang="html">
  <div class="poke-cards">
    <div class="poke-cards--header columns is-mobile is-variable is-1">
      <div class="column">
        <slot />
      </div>
      <div class="column is-narrow">
        <div class="field">
            <b-switch
              type="is-danger"
              size="is-small"
              :value="isEasyMode" @input="setIsEasyMode">
                <span v-if="isMobile">{{ isEasyMode ? 'Easy' : 'Normal' }}</span>
                <span v-else>{{ isEasyMode ? 'Easy mode' : 'Normal mode' }}</span>
            </b-switch>
        </div>
      </div>
    </div>

    <progress v-if="forceDisplay"
      class="progress is-small is-danger"
      :value="timer"
      :max="visibleTimeout" />

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
    visibleTimeout: 0,
    timer: 0
  }),
  computed: {
    ...mapGetters(['pokeCardsLists', 'foundCount']),
    ...mapState(['found', 'selecteds', 'level', 'isEasyMode', 'isMobile']),
    forceDisplay () {
      return this.visibleTimeout > 0
    }
  },
  watch: {
    pokeCardsLists: 'bootstrap'
  },
  methods: {
    ...mapActions(['selectPokeCard', 'setIsEasyMode']),
    startVisible (timeout) {
      this.visibleTimeout = timeout
      this.$interval = setInterval(() => {
        this.timer++
        if (this.timer >= timeout) {
          this.stopVisible()
          getThemAll()
        }
      }, 1000)
    },
    stopVisible () {
      clearInterval(this.$interval)
      this.visibleTimeout = 0
      this.timer = 0
    },
    bootstrap () {
      this.stopVisible()

      if (!this.isEasyMode) {
        return
      }

      this.$nextTick(() => {
        this.startVisible(this.level / 2)
      })
    },
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

<style lang="scss">
  .poke-cards--header {
    margin-top: 10px;
    margin-bottom: 10px;
    .field {
      margin-top: 5px;
    }
  }
</style>
