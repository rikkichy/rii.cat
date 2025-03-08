<template>
  <UContainer class="flex flex-col items-center justify-center h-screen">
    <UCard class="w-full max-w-md text-center">
      <UIcon name="i-heroicons-face-frown" class="w-16 h-16 text-primary mb-4 mx-auto" />
      <h1 class="text-2xl font-bold mb-4">{{ randomText }}</h1>
      <UProgress :value="(countdown / 4) * 100" class="mb-4" />
      <p class="text-gray-600 dark:text-gray-400 mb-6">Redirecting in {{ countdown }} seconds...</p>
      <UButton
        icon="i-heroicons-home"
        size="xl"
        color="primary"
        variant="solid"
        to="/"
        class="transition-transform duration-200 hover:-translate-y-1"
      >
        Go back
      </UButton>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
// Use useState for better reactivity
const randomText = useState('errorRandomText', () => '')
const countdown = useState('errorCountdown', () => 4)

// Generate random text function
const generateRandomText = () => {
  const randomTextOptions = [
    "Oops..wrong place.",
    "No, not here.",
    "Why are you here?",
    "Something happened..",
  ]
  
  // Use modern array method for randomization
  return randomTextOptions[Math.floor(Math.random() * randomTextOptions.length)]
}

// Set initial random text
onMounted(() => {
  randomText.value = generateRandomText()
  
  // Create countdown timer
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(interval)
      navigateTo('/')
    }
  }, 1000)
  
  // Clean up interval on component unmount
  onUnmounted(() => {
    clearInterval(interval)
  })
})

// Handle errors properly
const error = useError()

// Define error page meta
definePageMeta({
  pageTransition: {
    name: 'bounce'
  }
})
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>