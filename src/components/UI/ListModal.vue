<template>
  <div :class="modalType" v-show="openModal">
    <div :class="modalType + '-content'">
      <span class="close-modal" @click="$emit('closeModal')">X</span>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  modalType: {
    type: String,
    default: 'modal'
  },
  openModal: {
    type: Boolean,
    default: true
  }
})
</script>
<style lang="sass" scoped>
.newlistmodal
  display: flex
  position: fixed
  top: 0
  left: 0
  justify-content: center
  width: 100%
  height: 100%
  align-items: center
  background: rgb(203 201 191 / 70%)
.newlistmodal-content
  display: flex
  background: #eee
  width: 30%
  height: 48%
  position: relative
  padding: 20px 20px
  border-radius: 10px
  box-shadow: 0px 0px 7px 2px rgba(64, 47, 66, .4)
  .close-modal
    position: absolute
    right: 11px
    top: 6px
    cursor: pointer
</style>
