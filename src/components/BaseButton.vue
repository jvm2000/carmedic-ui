<script setup lang="ts">
defineOptions({ inheritAttrs: false })

type ButtonProps = {
  /**
   * If the input is required.
   */
  type?: 'primary' | 'secondary',

  /**
   * If the input is required.
   */
  disabled?: boolean,
}

const props = withDefaults(
  defineProps<{
    type?: ButtonProps['type'],
    disabled?: ButtonProps['disabled'],
  }>(),
  {
    type: 'primary',
    disabled: false,
  }
)
</script>

<template>
  <button 
    v-bind="$attrs"
    class="flex items-center px-4 py-2.5 text-base rounded-md ring-1 ring-red-600 font-medium hover:opacity-90 justify-center w-full"
    :class="[
      props.type === 'primary'
        ? 'bg-red-600 text-white'
        : 'bg-white text-red-600'
    ]"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>