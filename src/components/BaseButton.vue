<script setup lang="ts">
defineOptions({ inheritAttrs: false })

type ButtonProps = {
  /**
   * Button type.
   */
  type?: 'primary' | 'secondary',

  /**
   * If the button is disabled.
   */
  disabled?: boolean,

  /**
   * If the button is loading.
   */
  loading?: boolean,
}

const props = withDefaults(
  defineProps<{
    type?: ButtonProps['type'],
    disabled?: ButtonProps['disabled'],
    loading?: ButtonProps['loading'],
  }>(),
  {
    type: 'primary',
    disabled: false,
    loaading: false
  }
)
</script>

<template>
  <button 
    v-bind="$attrs"
    type="submit"
    class="flex items-center px-4 py-2.5 text-base rounded-md ring-1 ring-red-600 font-medium hover:opacity-90 justify-center w-full disabled:opacity-75"
    :class="[
      props.type === 'primary'
        ? 'bg-red-600 text-white'
        : 'bg-white text-red-600'
    ]"
    :disabled="props.disabled || props.loading"
  >
    <svg
      v-if="props.loading"
      class="w-4 h-4 animate-spin mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>

    <slot v-if="!props.loading" name="button" />

    <slot />
  </button>
</template>