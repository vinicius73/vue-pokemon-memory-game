<template>
  <div class="modal-card" ref="root">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Informations
      </p>
    </header>
    <section class="modal-card-body">
      <h2 class="title">Game Modes</h2>
      <p>Mods that change the game experience and the final score.</p>

      <hr>

      <div class="columns is-mobile">
        <div class="column">
          <h3 class="subtitle">
            <b-icon icon="baby-buggy" /> Easy Mode
          </h3>
          <p>Begin practice with all revealed cards.</p>
          <p>The time varies with the selected level.</p>
          <p>Playing at this level makes you lose 50% of base score, in roulette mode this value is 75%</p>
        </div>
        <div class="column">
          <h3 class="subtitle">
            <b-icon icon="shuffle-variant" /> Roulette Mode
          </h3>
          <p>This mode provides an extra difficulty and with this a much larger base score.</p>
          <p>After a number of caught pokemon, there is a new shuffle.</p>

        </div>
      </div>

      <hr>
      <h2 class="title">Scores</h2>
      <p>Each Pokémon you catch adds points to your final score. These points vary depending on the level and mode of play.</p>
      <p>At each failure this base score loses 10% of its value, accumulating up to 90% loss.</p>
      <table class="table is-bordered is-fullwidth">
        <thead>
          <tr>
            <th>Level</th>
            <th>Base Score / Easy</th>
            <th>Roulette Mode / Easy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in levelsList" :key="row.level">
            <td>{{ row.level }}</td>
            <td>{{ row.base | number }} / {{ row.base_easy | number }}</td>
            <td>{{ row.roulette | number }} / {{ row.roulette_easy | number }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { map } from 'lodash-es'

export default {
  name: 'InformationsModal',
  computed: {
    ...mapGetters(['levels']),
    levelsList () {
      return map(this.levels, level => {
        const base = Math.pow(level, 2)
        const roulette = Math.pow(level, 3)
        return {
          level: level * 2,
          base,
          roulette,
          base_easy: base * 0.5,
          roulette_easy: roulette * 0.25
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
