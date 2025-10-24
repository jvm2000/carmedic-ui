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
   * The type for the input.
   */
  type?: string,

  /**
   * An error message or messages value indicating whether the input is in an error state.
   */
  error?: string | string[] | null,
}

const model = defineModel({ required: false })
const props = withDefaults(
  defineProps<{
    placeholder?: InputProps['placeholder'],
    label?: InputProps['label'],
    type?: InputProps['type'],
    error?: InputProps['error'],
  }>(),
  {
    type: 'text',
    error: '',
    info: ''
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

function handleInput() {
  errorMessage.value = ''
}
</script>

<template>
  <div class="flex flex-col space-y-2 w-full">
    <label class="text-base font-medium text-black">{{ props.label }}</label>

    <div class="relative flex items-center">
      <input 
        v-model="model"
        :type="props.type === 'password' && !isPlainText ? 'text' : props.type"
        class="text-base outline-none px-4 py-2 ring-1 rounded-md w-full bg-gray-50"
        :class="[errorMessage ? 'ring-1 ring-red-500 placeholder-red-500' : 'ring-gray-300']"
        :placeholder="props.placeholder"
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