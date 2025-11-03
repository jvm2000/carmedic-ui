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
  <div class="flex flex-col items-center space-y-1">
    <div 
      class="size-14 grid place-items-center rounded-full"
      :class="{
        'bg-red-500 text-white': props.selected,
        'bg-red-50 border border-red-500 text-black': !props.selected,
        'bg-red-400 border border-inherit text-white': props.isDone && !props.selected,
      }"
    >
      <span 
        v-if="!props.isDone" 
        class="text-xl font-bold"
      >{{ props.display }}</span>

      <CheckIcon 
        v-if="props.isDone && !props.selected" 
        class="size-6 stroke-white"
      />
    </div>

    <p 
      class="text-sm text-black text-center"
      :class="[props.selected ? 'font-medium' : '']"
    >{{ props.label }}</p>

    <p 
      class="text-sm text-gray-800 text-center"
    >{{ props.description }}</p>
  </div>
</template>