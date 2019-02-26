<template>
  <figure class="image is-3by3">
    <transition name="fade" mode="out-in">
      <img v-if="visible" v-bind="{ src }" key="src" />
      <img v-else :src="placeholdSrc" key="placehold" />
    </transition>
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
    }
  },
  mounted () {
    (new Image()).src = this.src
  }
}
</script>

<style lang="scss">
.flip-enter-active {
  transition: all .2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.flip-leave-active {
  transition: all .25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.flip-enter, .flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
