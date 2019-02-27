<template>
  <div class="field has-addons">
    <p class="control" v-for="level, index in $options.levels" :key="index">
      <a class="button" @click="$emit('input', level)">
        <span class="tag" :class="level===value ? 'is-danger' : 'is-black' " >{{ level*2 }}</span>
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'LevelSelect',
  levels: [6, 9, 12, 15, 18, 21, 24, 27, 30],
  props: {
    value: Number
  }
}
</script>
