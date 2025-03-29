<template>
  <UApp>
    <NuxtPage />
      <NuxtLayout />
  </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.35s;
}

.page-enter-from {
  opacity: 0;
  filter: blur(0.75rem);
  transform: scale(1.1);
}

.page-leave-to {
  opacity: 0;
  filter: blur(0.75rem);
  transform: scale(0.95);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(0.5rem);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
  filter: blur(0.5rem);
}
</style>