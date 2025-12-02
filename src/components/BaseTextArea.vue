<script setup lang="ts">
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

const model = defineModel<any>({ required: false })
const props = withDefaults(
  defineProps<{
    placeholder?: InputProps['placeholder'],
    label?: InputProps['label'],
    type?: InputProps['type'],
    required?: InputProps['required'],
    error?: InputProps['error'],
    disabled?: InputProps['disabled'],
  }>(),
  {
    type: 'text',
    required: false,
    error: '',
    info: '',
    disabled: false,
  }
)

const errorMessage = ref<string[] | string | null>('')

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
      
      <textarea 
        v-model="model"
        class="text-base px-4 py-2 ring-1 rounded-md w-full bg-gray-50 ring-red-50 focus:ring-blue-300 disabled:opacity-75 h-24 disabled:cursor-not-allowed"
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
      ></textarea>
    </div>
    
    <p v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</p>
  </div>
</template>