<script setup lang="ts">
import type { PropType } from 'vue'
import type { dropDown } from '@/types'

defineProps({
  items: {
    type: Array as PropType<dropDown[]>
  },
  className: {
    type: String
  }
})
</script>
<template>
  <select :class="className">
    <option v-for="(item, index) in items" :key="index" :value="item.value">
      {{ item.name }}
    </option>
  </select>
</template>
<style lang="sass" scoped>
.sort
  background: #ddd
  border: none
  width: 60%
  padding: 10px
  border-radius: 4px
</style>
