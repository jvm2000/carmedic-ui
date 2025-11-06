<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'

type StepProps = {
  /**
   * Step dispay.
   */
  display?: string,

  /**
   * Label to be dispay.
   */
  label?: string,

  /**
   * Description to be dispay.
   */
  description?: string,

  /**
   * If the step is selected.
   */
  selected?: boolean,

  /**
   * If the step is done.
   */
  isDone?: boolean,

  /**
   * If the button is disabled.
   */
  disabled?: boolean,
}

const props = withDefaults(
  defineProps<{
    display?: StepProps['display'],
    label?: StepProps['label'],
    description?: StepProps['description'],
    selected?: StepProps['selected'],
    isDone?: StepProps['isDone'],
    disabled?: StepProps['disabled'],
  }>(),
  {
    display: 'primary',
    selected: false,
    isDone: false,
    disabled: false,
    loaading: false
  }
)
</script>

<template>
  <div class="flex flex-col sm:items-center space-y-1">
    <div 
      class="size-20 sm:size-14 grid place-items-center rounded-full mb-4 sm:mb-0"
      :class="[
        props.selected && !props.isDone
          ? 'bg-red-500 text-white border-red-500' 
          : props.isDone 
            ? 'bg-red-400 text-white border-red-400'
            : 'bg-red-50 border-red-500'
      ]"
    >
      <span 
        v-if="!props.isDone || props.selected" 
        class="text-2xl sm:text-xl font-bold"
      >{{ props.display }}</span>

      <CheckIcon 
        v-if="props.isDone && !props.selected" 
        class="size-6 stroke-white"
      />
    </div>

    <p 
      class="text-lg sm:text-sm text-black sm:text-center"
      :class="[props.selected ? 'font-medium' : '']"
    >{{ props.label }}</p>

    <p 
      class="text-lg sm:text-sm text-gray-800 sm:text-center"
    >{{ props.description }}</p>
  </div>
</template>