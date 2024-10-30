<template>
  <div class="list-wrapper">
    <div class="list-items">
      <h3 v-if="selectedListContent">
        <b>{{ selectedListContent[0]?.name }} items</b>
      </h3>
      <hr />
      <div
        class="list-content"
        v-for="(listitem, index) in selectedListContent[0]?.list_items"
        :key="index"
      >
        <p>{{ listitem.name }}</p>
        <div class="delete" @click="deleteTask(selectedListContent[0]?.id, listitem.id)">
          <img src="./../assets/icons/delete.svg" alt="icon" />
        </div>
      </div>
    </div>
    <footer>
      <TextBox input-class="create-list-item" input-type="text" @onchange="inputChange" />
      <Button
        button-type="add-listitem"
        button-text="Add"
        @click="addListItem(selectedListContent[0]?.id)"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { uselistitems } from '@/stores/listItems'
// import type { selectedList } from '@/types'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import TextBox from '@/components/UI/TextBox.vue'
import Button from '@/components/UI/CustomButton.vue'

const { getListContent, deleteListItem, createListItem } = uselistitems()
const { selectedList, selectedListContent, listItems } = storeToRefs(uselistitems())
const listItemName = ref<String>('')

const initialise = async () => {
  if (selectedList.value.listId > 0) {
    await getListContent()
  }
}

const inputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  listItemName.value = target.value
}

const addListItem = async (listId: number) => {
  await createListItem(listId, { name: `${listItemName.value}` })
  location.reload()
}

const deleteTask = async (listId: number, listItemId: number) => {
  await deleteListItem(listId, listItemId)
}

watchEffect(() => {
  if (listItems.value.length > 0) {
    initialise()
  }
})
</script>

<style lang="sass" scoped>
.list-wrapper
  display: flex
  width: 100%
  flex-direction: column
  padding: 12px
  background: #eee
  border-radius: 8px
  footer
    display: flex
    flex-direction: row
    align-items: center
    gap: 30px
.list-items
  background: #eee
  height: 80%

.list-content
  display: flex
  justify-content: center
  align-items: center
.delete
  margin-left: 20px
  img
    width: 24px
    height: 24px
    cursor: pointer
</style>
