<template>
  <figure class="image is-1by1" :style="style">
    <!--  -->
  </figure>
</template>

<script>
export default {
  name: 'ImageFlip',
  props: {
    visible: Boolean,
    src: String,
    placehold: String
  },
  computed: {
    placeholdSrc () {
      return `http://placehold.jp/ffffff/000000/172x172.png?text=${this.placehold}`
    },
    style () {
      const src = this.visible
        ? this.src
        : this.placeholdSrc
      return {
        'background-image': `url(${src})`
      }
    }
  },
  mounted () {
    (new Image()).src = this.src
  }
}
</script>

<style lang="scss" scoped>
.image {
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transition: all .1s ease-in-out;
}
</style>
