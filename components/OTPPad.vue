<template>
  <div ref="container" class="flex gap-4 items-center">
    <input
      v-for="n in length"
      :key="n"
      @keyup="(e) => handleEnter(e, n - 1)"
      @paste="handlePaste"
      v-model="otpArray[n - 1]"
      type="text"
      maxlength="1"
      class="caret-transparent border rounded-md w-10 p-2 text-center"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const otpProps = defineProps({
  length: {
    type: Number,
    default: 4,
  },
})

const otpArray = ref([])

const container = ref()

const emit = defineEmits(['entered'])

onMounted(() => {
  for (let i = 0; i < otpProps.length; i++) {
    otpArray.value[i] = null
  }
})

function handleEnter(e, i) {
  const children = container.value.children
  const keypressed = e.key

  if (i > 0 && (keypressed === 'Backspace' || keypressed === 'Delete')) {
    otpArray.value[i] = null
    children[i - 1].focus()
  } else if (keypressed === 'ArrowLeft') {
    children[i - 1].focus()
  } else if (keypressed === 'ArrowRight') {
    children[i + 1].focus()
  } else if (keypressed.match(/^[0-9]$/) && i == otpProps.length - 1) {
    otpArray.value[i] = keypressed
    checkOTP()
  } else {
    const matched = keypressed.match(/^[0-9]$/)
    if (!matched) {
      return
    } else if (i < otpProps.length - 1) {
      children[i + 1].focus()
      otpArray.value[i] = keypressed
    }
    checkOTP()
  }
}

function handlePaste(e) {
  const pastedText = e.clipboardData.getData('text/plain').replace(/\D/g, '')

  for (let i = 0; i < otpProps.length && i < pastedText.length; i++) {
    otpArray.value[i] = pastedText[i]
  }

  // Trigger checkOTP after pasting
  checkOTP()
}

function checkOTP() {
  const children = container.value.children

  let flag = true

  for (let i = 0; i < otpProps.length; i++) {
    if (otpArray.value[i] == null) {
      children[i].classList.add('border-red-500')
      flag = false
    } else {
      children[i].classList.remove('border-red-500')
    }
  }
  if (flag) {
    emit('entered', otpArray.value.join(''))
  }
}
</script>
