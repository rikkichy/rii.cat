<template>
  <NuxtPage />
</template>

<style>
/* ... */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 5, 1, 45deg);
  filter: blur(1rem);
}
</style>