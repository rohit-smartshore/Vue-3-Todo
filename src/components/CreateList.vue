<template>
  <ListModal modalType="newlistmodal" :openModal="openModal" @close-modal="$emit('closeModal')">
    <h3 class="modal-title"><b>New list</b></h3>
    <div class="modal-body">
      <TextBox
        placeholder="text"
        inputClass="new-list-text"
        inputType="text"
        inputLabel="List Title"
        @onchange="inputChange"
        :value="listTitle"
      />
      <p class="error-list" v-show="validationError.listName">{{ validationError.listName }}</p>
      <TextBox
        placeholder="text"
        inputClass="new-task"
        inputType="text"
        inputLabel="Task name"
        @onchange="inputChange"
        :value="taskName"
      />
      <p class="error-task" v-if="validationError.taskName">{{ validationError.taskName }}</p>
    </div>
    <AddList buttonType="add-list" buttonText="Add" @click="createList()" />
  </ListModal>
</template>

<script setup lang="ts">
import ListModal from '@/components/UI/ListModal.vue'
import TextBox from '@/components/UI/TextBox.vue'
import AddList from '@/components/UI/CustomButton.vue'
import { ref } from 'vue'
import type { validations } from '@/types'
import { uselistitems } from '@/stores/listItems'
import type { createListPayload } from '@/types'

defineProps({
  openModal: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['closeModal'])

const listTitle = ref('')
const taskName = ref('')
const validationError = ref<validations>({
  listName: null,
  taskName: null
})
const { createNewList } = uselistitems()

const inputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.className == 'new-list-text') {
    listTitle.value = target.value
  } else {
    taskName.value = target.value
  }
}

const createList = async () => {
  listTitle.value.length < 1
    ? (validationError.value.listName = 'Title is required')
    : (validationError.value.listName = null)

  taskName.value.length < 1
    ? (validationError.value.taskName = 'Task Name is required')
    : (validationError.value.taskName = null)

  if (!validationError.value.listName && !validationError.value.taskName) {
    const payload: createListPayload = {
      name: listTitle.value,
      list_items: [
        {
          name: taskName.value
        }
      ]
    }
    const closeModal = await createNewList(payload)
    if (closeModal == 'done') {
      emits('closeModal')
      listTitle.value = ''
      taskName.value = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.modal-title
  margin: 5px
.modal-body
  display: flex
  position: absolute
  bottom: 40%
  width: 80%
  justify-content: center
  align-items: center
  gap: 28%

.error-list
  color: red
  position: absolute
  top: 60%
  left: 0
.error-task
  color: red
  position: absolute
  top: 60%
  right: 0
</style>
