<script setup lang="ts">
import CustomButton from '@/components/UI/CustomButton.vue'
import DropDown from '@/components/UI/DropDown.vue'
import type { dropDown } from '@/types'
import { useUserStore } from '@/stores/userStore'

const dropDownItems: dropDown[] = [
  {
    name: 'date asc',
    value: 'asc'
  },
  {
    name: 'date desc',
    value: 'desc'
  }
]
const userStore = useUserStore()

const signOut = () => {
  userStore.$reset()
  console.log(userStore.accessToken)

  // location.reload()
}
</script>

<template>
  <div class="list-nav">
    <div class="new-list">
      <h3>
        <b>Lists</b>
      </h3>
      <CustomButton buttonType="new-list" buttonText="new list" @onClick="$emit('openModal')" />
    </div>
    <div class="sorting">
      <CustomButton button-type="signout" button-text="Sign Out" @click="signOut" />
      <div class="sort">
        <p>Sorting:</p>
        <DropDown :items="dropDownItems" className="sort" />
      </div>
    </div>
  </div>
</template>
<style lang="sass">
.list-nav
  display: flex
  justify-content: space-between
.new-list
  display: flex
  justify-content: space-between
  width: 17%
  align-items: center
.sorting
  display: flex
  justify-content: space-between
  width: 24%
  align-items: center
  .sort
    display: flex
    align-items: center
    gap: 15px
</style>
