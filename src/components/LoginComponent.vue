<template>
  <div class="inputs" @keyup.enter.prevent="login(validationError)">
    <div class="email-input">
      <TextBox
        inputType="email"
        inputClass="email"
        :value="email"
        inputLabel="Email"
        @onchange="inputChange"
      />
    </div>
    <div class="password-input">
      <TextBox
        inputType="password"
        inputClass="password"
        inputLabel="Password"
        @onchange="inputChange"
        :value="password"
      />
    </div>
    <div class="login-button">
      <Button buttonType="login" buttonText="Login" @onClick="login(validationError)" />
    </div>
    <RouterLink class="register-link" :to="{ name: 'register' }"
      >Not already a user? <br />Signup
    </RouterLink>
    <div class="validation-errors">
      <p v-if="error" class="error">{{ error }}</p>
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

const { loginUser } = useUserStore()
const { error } = storeToRefs(useUserStore())
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const email = ref<string>('')
const password = ref<string>('')
const validationError = ref<validation>({
  emailError: null,
  passwordError: null,
  requiredEmailErr: null,
  requiredPasswordErr: null
} as validation)

const inputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.className == 'email') {
    email.value = target.value
    const emailTypeVerify = emailRegex.test(email.value)
    !emailTypeVerify
      ? (validationError.value.emailError = 'Enter valid email')
      : (validationError.value.emailError = null)
  } else {
    password.value = target.value
    password.value.length < 8
      ? (validationError.value.passwordError = 'Please insert minimun 8 characters for password ')
      : (validationError.value.passwordError = null)
  }
}

const login = (validationError: validation) => {
  !email.value.length
    ? (validationError.requiredEmailErr = 'Email field is required')
    : (validationError.requiredEmailErr = null)

  password.value.length < 1
    ? (validationError.requiredPasswordErr = 'Password field is required')
    : (validationError.requiredPasswordErr = null)
  if (
    !validationError.emailError &&
    !validationError.passwordError &&
    !validationError.requiredEmailErr &&
    !validationError.requiredPasswordErr
  ) {
    loginUser(email.value, password.value)
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

.email-input
  display: flex
  justify-content: center
.password-input
  display: flex
  justify-content: center
.login-button
  margin: 5px
  display: flex
  justify-content: center
.register-link
  display: flex
  justify-content: center
  text-align: center
.error
  color: red
  position: relative
  left: 23%

.register-link
  text-decoration: none
</style>
