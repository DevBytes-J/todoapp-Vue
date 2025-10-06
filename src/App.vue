<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { checkSession } = useAuth()

onMounted(async () => {
  await checkSession()
})
</script>