
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, TransitionRoot } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

type ComboboxProps = {
  /**
   * The placeholder for the combobox.
   */
  placeholder?: string,

  /**
   * The label for the combobox
   */
  label?: string,
}

const model = defineModel<any>({ required: false })
const props = withDefaults(
  defineProps < {
    placeholder?: ComboboxProps['placeholder'],
    label?: ComboboxProps['label'],
  }>(),
  {
    placeholder: 'Seletc a state',
    label: ''
  }
)

const states = ref<any>([])
const query = ref('')
const filteredOptions = computed(() =>
  query.value === ''
    ? states.value
    : states.value.filter((option: any) =>
        option
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)

async function getStates() {
  const response = await fetch("https://abledonline.com/carmedicdirectory/api/public_html//states")

  const data = await response.json()

  states.value = data
}

onMounted(() => getStates())
</script>

<template>
  <div class="flex flex-col space-y-2 w-full">
    <label class="text-base font-medium text-black">{{ props.label }}</label>

    <Combobox v-model="model">
      <div class="relative mt-1">
        <div
          class="relative w-full overflow-hidden"
        >
          <ComboboxInput
            class="text-base ring-0 focus:ring-0 outline-none px-4 py-2 border border-gray-300 rounded-md w-full bg-gray-50"
            :displayValue="(option: any) =>  option"
            :placeholder="props.placeholder"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
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
              Nothing found.
            </div>

            <ComboboxOption
              v-for="option in filteredOptions"
              as="template"
              :key="option"
              :value="option"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-3 px-6"
                :class="{
                  'bg-red-400 text-black': active,
                  'text-gray-900': !active,
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
  </div>
</template> 
