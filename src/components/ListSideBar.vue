<template>
  <div class="sidebar">
    <div v-for="(listItem, index) in listItems" :key="index" class="sidebar-content">
      <p
        class="list-parent"
        :class="selectedList.index == index ? 'selected' : ''"
        @click="setSelectedList(index, listItem.id, listItem.userId)"
      >
        {{ listItem.name }}
      </p>
      <img src="./../assets/icons/cancel.svg" alt="icon" @click="deleteFullList(listItem.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { uselistitems } from '@/stores/listItems'
import { storeToRefs } from 'pinia'

const { getList, setSelectedList, deleteList } = uselistitems()
const { listItems, selectedList } = storeToRefs(uselistitems())
const initialise = async () => {
  await getList()
  if (listItems.value.length > 0) {
    const listIndex = listItems.value.indexOf(listItems.value[0])
    setSelectedList(listIndex, listItems.value[0].id, listItems.value[0].userId)
  }
}

const deleteFullList = async (listId: number) => {
  await deleteList(listId)
  location.reload()
}

onMounted(() => {
  initialise()
})
</script>
<style lang="sass" scoped>
.sidebar
  background: #eee
  width: 20%
  height: 500px
  padding: 20px
  overflow-y: scroll
  border-radius: 8px
  .sidebar-content
    display: flex
    align-items: center
    overflow: unset
    justify-content: space-between
    .list-parent
      display: flex
      justify-content: flex-start
      margin-left: 15px
      cursor: pointer
    .selected
      text-decoration: underline

    img
      width: 20px
      height: 20px
      cursor: pointer
</style>
