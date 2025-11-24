<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/24/outline'

type ComboboxProps = {
  options: any[]
  placeholder?: string
  label?: string
  error?: string | string[] | null
  required?: boolean
}

const model = defineModel<any>({ required: false })
const props = withDefaults(
  defineProps<{
    options: ComboboxProps['options']
    placeholder?: string
    label?: string
    error?: ComboboxProps['error']
    required?: ComboboxProps['required']
  }>(),
  {
    options: () => [],
    placeholder: 'Select a state',
    label: '',
    error: '',
    required: false
  }
)

const query = ref('')
const errorMessage = ref<string[] | string | null>('')

const internalOptions = ref<any[]>([])

watch(
  () => props.error,
  value => {
    errorMessage.value = value
  }
)

function handleCombobox() {
  errorMessage.value = ''
}

const filteredOptions = computed(() =>
  query.value === ''
    ? internalOptions.value
    : internalOptions.value.filter(option =>
        option
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)

function handleEnterKey() {
  const text = query.value.trim()
  if (!text) return

  const exists = internalOptions.value.includes(text)

  if (!exists) {
    internalOptions.value.push(text) // add custom item
  }

  model.value = text
}

watch(
  () => props.options,
  (newOptions) => {
    internalOptions.value = [...newOptions]
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex flex-col space-y-2 w-full">
    <label class="text-base font-medium text-black">
      {{ props.label }}
      <span v-if="props.required" class="text-red-500">*</span>
    </label>

    <Combobox v-model="model" @update:model-value="handleCombobox">
      <div class="relative mt-1">
        <div class="relative w-full overflow-hidden">
          <ComboboxInput
            class="text-base ring-0 focus:ring-0 outline-none px-4 py-2 border border-gray-300 rounded-md w-full bg-gray-50"
            :class="[errorMessage ? 'border-red-500 placeholder-red-500' : '']"
            :displayValue="(val: any) => val"
            :placeholder="props.placeholder"
            @input="query = $event.target.value; handleCombobox()"
            @keydown.enter.prevent="handleEnterKey"
          />

          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
          </ComboboxButton>
        </div>

        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-[9999]"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700 text-base"
            >
              Nothing found. Press Enter to add <span class="font-semibold">"{{ query }}"</span>
            </div>

            <ComboboxOption
              v-for="option in filteredOptions"
              :key="option"
              :value="option"
              v-slot="{ selected, active }"
              as="template"
            >
              <li
                class="relative cursor-default select-none py-3 px-6"
                :class="{
                  'bg-gray-200 text-black': active,
                  'text-gray-900': !active
                }"
              >
                <span
                  class="block truncate text-base"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ option }}
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>

    <p v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</p>
  </div>
</template>
