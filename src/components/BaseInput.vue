<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { ref, watch } from 'vue';

defineOptions({ inheritAttrs: false })

type InputProps = {
  /**
   * The placeholder to display for the input.
   */
  placeholder?: string,

  /**
   * The label to display for the input.
   */
  label?: string

  /**
   * If the input is required.
   */
  required?: boolean

  /**
   * If the input is uppercase.
   */
  uppercase?: boolean

  /**
   * If the input is formatted.
   */
  formatted?: boolean

  /**
   * The type for the input.
   */
  type?: string

  /**
   * An error message or messages value indicating whether the input is in an error state.
   */
  error?: string | string[] | null

  /**
   * If the input is disabled.
   */
  disabled?: boolean
}

const model = defineModel({ required: false })
const props = withDefaults(
  defineProps<{
    placeholder?: InputProps['placeholder'],
    label?: InputProps['label'],
    type?: InputProps['type'],
    required?: InputProps['required'],
    uppercase?: InputProps['uppercase'],
    formatted?: InputProps['formatted'],
    error?: InputProps['error'],
    disabled?: InputProps['disabled'],
  }>(),
  {
    type: 'text',
    required: false,
    uppercase: false,
    formatted: false,
    error: '',
    info: '',
    disabled: false,
  }
)

const errorMessage = ref<string[] | string | null>('')
const isPlainText = ref(true)

watch(
  () => props.error,
  (value) => {
    errorMessage.value = value
  }
)

function handleInput(e: Event) {
  errorMessage.value = ''

  const target = e.target as HTMLInputElement

  if (props.uppercase) {
    model.value = target.value.toUpperCase()
  }

  if (props.formatted) {
    let value = target.value.toUpperCase()

    value = value.replace(/-/g, '')

    value = value.slice(0, 6)

    if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3)
    }

    model.value = value
  }
}
</script>

<template>
  <div class="flex flex-col space-y-2 w-full">
    <label 
      class="text-base font-medium"
      :class="[props.disabled ? 'text-gray-500' : 'text-black']"
    >
      {{ props.label }} 
      <span v-if="props.required" class="text-red-500">*</span>
    </label>

    <div class="relative flex items-center">
      <div class="absolute left-4">
        <slot name="icon"></slot>
      </div>
      
      <input 
        v-model="model"
        :type="props.type === 'password' && !isPlainText ? 'text' : props.type"
        class="text-base px-4 py-2 ring-1 rounded-md w-full bg-gray-50 ring-red-50 focus:ring-blue-300 disabled:opacity-75 disabled:cursor-not-allowed"
        :class="[
          'rounded-md px-3 py-2', // base styles
          errorMessage
            ? 'ring-red-500 placeholder-red-500'
            : $slots.icon
              ? 'pl-12'
              : 'pl-4'
        ]"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        @input="handleInput"
      >

      <EyeSlashIcon 
        v-if="props.type === 'password' && isPlainText" class="size-5 stroke-gray-800 absolute right-4 cursor-pointer"
        @click="isPlainText = false"
      />

      <EyeIcon 
        v-if="props.type === 'password' && !isPlainText" class="size-5 stroke-gray-800 absolute right-4 cursor-pointer"
        @click="isPlainText = true"
      />
    </div>
    
    <p v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</p>
  </div>
</template>