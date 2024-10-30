<script setup lang="ts">
defineProps({
  buttonType: {
    type: String
  },
  buttonText: {
    type: String
  }
})
</script>
<template>
  <button class="button" :class="buttonType" @click="$emit('onClick')">
    <img src="./../../assets/icons/add.svg" alt="" />
    {{ buttonText }}
  </button>
</template>

<style lang="sass" scoped>
img
  width: 20px
  height: 20px
.button
  display: flex
  align-items: center
  cursor: pointer

.new-list
  border: none
  width: auto
  padding: 12px
  background: #afafaf
  border-radius: 4px
  transition: 1s
  &:hover
    background: #adfd
    transition: fade-out(#adfd,1s)
.add-list
  border: none
  width: auto
  height: fit-content
  padding: 12px
  background: #afafaf
  border-radius: 4px
  &:hover
    background: #adfd
    transition: fade-out(#adfd,1s)
.login
  border: none
  width: auto
  padding: 5px 10px
  background: #afafaf
  border-radius: 4px
  img
    display: none
.register
  border: none
  width: auto
  padding: 5px 10px
  background: #afafaf
  border-radius: 4px
  img
    display: none
.add-listitem
  border: none
  width: 80px
  height: fit-content
  padding: 12px
  background: #fff
  border-radius: 4px
  transition: 1s

  &:hover
    background: #adfd
    transition: fade-out(#adfd,1s)

.signout
  img
    display: none
</style>
