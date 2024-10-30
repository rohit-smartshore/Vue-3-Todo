<script setup lang="ts">
defineProps({
  inputType: {
    type: String
  },
  placeholder: {
    type: String
  },
  inputClass: {
    type: String
  },
  inputLabel: {
    type: String
  },
  value: {
    type: String
  }
})

const emit = defineEmits(['onchange'])
</script>
<template>
  <div class="textBox">
    <label v-show="inputLabel">{{ inputLabel }}</label>
    <input
      :type="inputType"
      :class="inputClass"
      :placeholder="placeholder"
      :value="value"
      @input="emit('onchange', $event)"
    />
  </div>
</template>

<style lang="sass" scoped>

.textBox
  display: flex
  flex-direction: column
  width: 80%
.new-list-text
  border: #afafaf solid
  outline: none
  width: 80%
  padding: 0 10px
  background: #fafafa
  border-radius: 4px
.new-task
  border: #afafaf solid
  outline: none
  width: 80%
  padding: 0 10px
  background: #fafafa
  border-radius: 4px
.username
  border: #afafaf solid
  outline: none
  padding: 0 10px
  background: #fafafa
  position: relative
  border-radius: 4px
.email
  border: #afafaf solid
  outline: none
  padding: 0 10px
  background: #fafafa
  position: relative
  border-radius: 4px
.password
  border: #afafaf solid
  outline: none
  padding: 0 10px
  background: #fafafa
  position: relative
  border-radius: 4px
.confirm-password
  border: #afafaf solid
  outline: none
  padding: 0 10px
  background: #fafafa
  position: relative
  border-radius: 4px
.create-list-item
  border: none
  outline: none
  padding: 0 10px
  background: #fafafa
  border-radius: 4px
  height: 40px
</style>
