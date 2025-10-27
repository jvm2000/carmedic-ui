<script setup lang="ts">
import { ref } from 'vue'
import { dbHelper } from '../helpers/dbHelper';
import { useAuth } from '../composables/useAuth';

const user = ref(null)
const { token } = useAuth()

async function fetchUserData() {
  const response = await dbHelper.get('/get', token.value ?? '')

  user.value = response.data
}

await fetchUserData()
</script>

<template>
  <div>ssdsdsd</div>
  <div>{{ token }}</div>
</template>