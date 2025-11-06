<script setup lang="ts">
import { onMounted } from 'vue'
import { useForm } from './composables/useForm'

const { setTitle, setFavicon } = useForm()

onMounted(() => {
  setTitle(null)
  setFavicon('/icons/favicon.ico')
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>