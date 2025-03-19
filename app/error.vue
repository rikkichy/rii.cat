<template>
  <UContainer class="flex flex-col items-center justify-center h-screen">
    <UCard class="w-full max-w-md text-center">
      <NuxtImg
          src="error.gif"
          format="gif"
          loading="eager"
          alt="shiroko-error"
          class="mx-auto"
      />
      <h1 class="text-2xl font-bold mb-2">Uh-Oh.. {{ error.statusCode }}</h1>
      <p class="text-lg mb-4">{{ getErrorMessage }}</p>
      <UProgress :value="(countdown / 4) * 100" class="mb-4" />
      <p class="text-gray-600 dark:text-gray-400 mb-4">Redirecting to home in {{ countdown }} seconds...</p>
      <UButton size="xl" icon="i-heroicons-home" label="Return to Home" @click="navigateHome" class="mx-auto" />
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
const countdown = useState('errorCountdown', () => 4)
const error = useError()

// Get appropriate error message based on status code
const getErrorMessage = computed(() => {
  const statusCode = error.value?.statusCode || 404
  
  switch (statusCode) {
    case 404:
      return "Seems like this page doesn't exist. Let's go back then!"
    case 403:
      return "You don't have permission to access this page."
    case 500:
      return "Something went wrong on our server. Enjoy shiroko dance!."
    case 503:
      return "Service temporarily unavailable. Enjoy shiroko dance!"
    default:
      return "Something unexpected happened. Let's go back!"
  }
})

const navigateHome = () => {
  clearError()
  navigateTo('/')
}

// Set up countdown timer
onMounted(() => {
  // Create countdown timer
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(interval)
      navigateHome()
    }
  }, 1000)
  //umount
  onUnmounted(() => {
    clearInterval(interval)
  })
})

definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  }
})
</script>