<template>
  <div v-if="showSpinner" class="loader-parent">
    <div class="loader"></div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  showSpinner: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="sass">
.loader-parent
  display: flex
  position: fixed
  top: 0
  left: 0
  justify-content: center
  width: 100%
  height: 100%
  align-items: center
  background: rgb(203 201 191 / 70%)

.loader
  position: absolute
  transform: translateX(-50%,-50%)
  border: 16px solid #f3f3f3
  border-radius: 50%
  border-top: 16px solid #3498db
  width: 100px
  height: 100px
  -webkit-animation: spin 2s linear infinite
  animation: spin 2s linear infinite

@-webkit-keyframes spin
  0%
    -webkit-transform: rotate(0deg)
  100%
    -webkit-transform: rotate(360deg)

@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
