<template lang="html">
  <div class="card">
    <div class="card-image">
      <figure class="image is-3by3">
        <img :src="src">
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object
  },
  computed: {
    src () {
      if (this.pokemon.is_default === 1) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`
      }

      return `http://placehold.jp/ffffff/000000/150x150.png?text=${this.pokemon.identifier}`
    }
  }
}
</script>
