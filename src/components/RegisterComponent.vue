<template>
  <div class="inputs">
    <TextBox
      inputType="text"
      inputClass="username"
      :value="name"
      inputLabel="Username"
      @onchange="inputChange"
    />
    <TextBox
      inputType="email"
      inputClass="email"
      :value="email"
      inputLabel="Email"
      @onchange="inputChange"
    />
    <TextBox
      inputType="password"
      inputClass="password"
      :value="password"
      inputLabel="Password"
      @onchange="inputChange"
    />
    <TextBox
      inputType="password"
      inputClass="confirm-password"
      :value="confirmPassword"
      inputLabel="Confirm Password"
      @onchange="inputChange"
    />
    <div class="register-button">
      <Button buttonType="register" buttonText="Register" @onClick="signup(validationError)" />
    </div>
    <div class="validation-error">
      <p v-if="error" class="error">{{ error }}</p>
      <p class="error" v-if="validationError.requiredNameErr">
        {{ validationError.requiredNameErr }}
      </p>
      <p class="error" v-if="validationError.emailError">
        {{ validationError.emailError }}
      </p>
      <p class="error" v-if="validationError.requiredEmailErr">
        {{ validationError.requiredEmailErr }}
      </p>
      <p class="error" v-if="validationError.passwordError">
        {{ validationError.passwordError }}
      </p>
      <p class="error" v-if="validationError.requiredPasswordErr">
        {{ validationError.requiredPasswordErr }}
      </p>
      <p class="error" v-if="validationError.confirmPassErr">
        {{ validationError.confirmPassErr }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TextBox from '@/components/UI/TextBox.vue'
import Button from '@/components/UI/CustomButton.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import type { validation } from '@/types'

const { registerUser } = useUserStore()
const { error } = storeToRefs(useUserStore())
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const validationError = ref<validation>({
  emailError: null,
  passwordError: null,
  requiredEmailErr: null,
  requiredPasswordErr: null
} as validation)

const inputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const emailTypeVerify = emailRegex.test(email.value)
  switch (target.className) {
    case 'username':
      name.value = target.value
      break
    case 'email':
      email.value = target.value
      !emailTypeVerify
        ? (validationError.value.emailError = 'Enter valid email')
        : (validationError.value.emailError = null)
      break
    case 'password':
      password.value = target.value
      password.value.length < 8
        ? (validationError.value.passwordError = 'Please insert minimun 8 characters for password ')
        : (validationError.value.passwordError = null)
      break
    case 'confirm-password':
      confirmPassword.value = target.value
  }
}

const signup = (validationError: validation) => {
  !name.value.length
    ? (validationError.requiredNameErr = 'UserName field is required')
    : (validationError.requiredNameErr = null)
  !email.value.length
    ? (validationError.requiredEmailErr = 'Email field is required')
    : (validationError.requiredEmailErr = null)

  password.value.length < 1
    ? (validationError.requiredPasswordErr = 'Password field is required')
    : (validationError.requiredPasswordErr = null)
  confirmPassword.value !== password.value
    ? (validationError.confirmPassErr = 'confirm field should match password')
    : (validationError.confirmPassErr = null)
  if (
    !validationError.emailError &&
    !validationError.passwordError &&
    !validationError.requiredEmailErr &&
    !validationError.requiredPasswordErr &&
    !validationError.confirmPassErr &&
    !validationError.requiredNameErr
  ) {
    registerUser(name.value, email.value, password.value)
  }
}
</script>
<style lang="sass" scoped>
.inputs
  width: 24%
  position: absolute
  top: 19%
  left: 34%
  padding: 20px 20px
  border-radius: 10px
  box-shadow: 0px 0px 7px 2px rgba(64, 47, 66, .4)
  .register-button
    margin: 5px
    display: flex
    justify-content: center
.error
  color: red
  position: relative
  left: 23%
</style>
