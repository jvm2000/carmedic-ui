<script setup lang="ts">
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { computed, onBeforeMount, ref } from 'vue'

const props = defineProps<{
  disabled?: boolean
}>()

const selectedDate = ref<Date | null>(null)
const currentDate = ref(new Date())

const modelValue = defineModel<string | Date>({ required: false })

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())

function getDaysForCalendar() {
  const firstOfMonth = new Date(currentYear.value, currentMonth.value, 1)
  const lastOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0)
  const days = []

  const firstWeekday = firstOfMonth.getDay()
  const totalDaysInMonth = lastOfMonth.getDate()

  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0)
  const totalDaysInPrevMonth = prevMonthLastDay.getDate()

  for (let i = firstWeekday - 1; i >= 0; i--) {
    const day = totalDaysInPrevMonth - i
    days.push({
      date: new Date(currentYear.value, currentMonth.value - 1, day),
      isCurrentMonth: false
    })
  }

  for (let i = 1; i <= totalDaysInMonth; i++) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value, i),
      isCurrentMonth: true
    })
  }

  while (days.length < 42) {
    const day: any = days.length - (firstWeekday + totalDaysInMonth) + 1
    days.push({
      date: new Date(currentYear.value, currentMonth.value + 1, day),
      isCurrentMonth: false
    })
  }

  return days
}

const calendarDays = computed(() => getDaysForCalendar())

function isSelected(day: any) {
  return (
    selectedDate.value !== null &&
    day.date.toDateString() === selectedDate.value.toDateString()
  )
}

const today = new Date()
today.setHours(0, 0, 0, 0)

function isPastDate(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d < today
}

function selectDate(day: any) {
  if (props.disabled) return
  if (isPastDate(day.date)) return

  selectedDate.value = new Date(day.date)
  currentDate.value = new Date(day.date)
  modelValue.value = selectedDate.value
}

function nextMonth() {
  if (props.disabled) return
  const next = new Date(currentDate.value)
  next.setMonth(currentDate.value.getMonth() + 1)
  currentDate.value = next
}

function prevMonth() {
  if (props.disabled) return
  const prev = new Date(currentDate.value)
  prev.setMonth(currentDate.value.getMonth() - 1)
  currentDate.value = prev
}

async function handleOpen() {
  if (modelValue.value) {
    const parsedDate = new Date(modelValue.value + 'T00:00:00')
    if (!isNaN(parsedDate.getTime())) {
      selectedDate.value = parsedDate
      currentDate.value = parsedDate
    }
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

onBeforeMount(async () => {
  await delay(1000)
  await handleOpen()
})
</script>

<template>
  <div class="flex flex-col space-y-2 w-full">
    <label class="text-base font-medium text-black">
      Select Date
      <span class="text-red-500">* </span>
    </label>

    <div class="w-full select-none" :class="props.disabled ? 'opacity-50' : ''">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-sm font-semibold text-custom-brown-500 uppercase tracking-wide">
          {{ monthNames[currentMonth] }} {{ currentYear }}
        </h2>

        <div class="flex gap-2">
          <button @click="prevMonth" :disabled="props.disabled">
            <ChevronUpIcon
              class="w-6 h-6"
              :class="props.disabled ? 'stroke-gray-300' : 'stroke-custom-brown-500'"
            />
          </button>

          <button @click="nextMonth" :disabled="props.disabled">
            <ChevronDownIcon
              class="w-6 h-6"
              :class="props.disabled ? 'stroke-gray-300' : 'stroke-custom-brown-500'"
            />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1 text-center text-sm font-medium text-custom-brown-500 mb-6">
        <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      </div>

      <div class="grid grid-cols-7 gap-x-1 text-center text-sm">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          @click="!props.disabled && !isPastDate(day.date) && selectDate(day)"
          class="aspect-square flex items-center justify-center transition-all"
          :class="[
            isSelected(day) ? 'bg-red-500 text-white rounded-lg' : '',
            !day.isCurrentMonth ? 'text-gray-400' : '',
            props.disabled
              ? 'text-gray-300 cursor-not-allowed'
              : isPastDate(day.date)
                ? 'text-gray-300 cursor-not-allowed'
                : 'cursor-pointer hover:bg-red-300 hover:rounded-lg'
          ]"
        >
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>
