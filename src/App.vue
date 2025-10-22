<script setup lang="ts">
import { onMounted } from 'vue'

function setTitle(titleChunk: string | null) {
  document.title = titleChunk
    ? `${titleChunk} · CarMedic`
    : 'CarMedic'
}

function setFavicon(href: string) {
  let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = href
}

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