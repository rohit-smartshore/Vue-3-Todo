<script setup lang="ts">
import ListNav from '@/components/listNav.vue'
import SideBar from '@/components/ListSideBar.vue'
import ListItems from '@/components/ListItems.vue'
import CreateList from '@/components/CreateList.vue'
import Spinner from '@/components/UI/SpinLoader.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const { loading } = storeToRefs(useUserStore())
const openModal = ref<boolean>(false)
</script>

<template>
  <div>
    <ListNav @openModal="openModal = true" />
  </div>
  <div class="content">
    <SideBar />
    <ListItems />
  </div>
  <CreateList :openModal="openModal" @closeModal="openModal = false" />
  <Spinner :showSpinner="loading" />
</template>
<style lang="sass" scoped>
.content
  display: flex
  justify-content: space-between
  height: 80%
  width: 100%
  gap: 20px
</style>
