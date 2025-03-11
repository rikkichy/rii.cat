<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Settings</h3>
      </template>

      <div class="space-y-6 py-2">
        <div class="flex items-center justify-between">
          <span>Dark mode</span>
          <UToggle v-model="isDark" />
        </div>
        <div class="flex items-center justify-between">
          <span>Secret Settings</span>
          <UToggle v-model="secretEnabled" />
        </div>
        <UFormGroup label="Brainrot Level" :help="getBrainrotLabel">
          <URange
            v-model="brainrotLevel"
            :step="25"
            :min="0"
            :max="100"
            class="w-full"
          />
        </UFormGroup>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const colorMode = useColorMode()

const secretEnabled = useState('secretEnabled', () => false)
const brainrotLevel = useState('brainrotLevel', () => 0)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const getBrainrotLabel = computed(() => {
  switch (brainrotLevel.value) {
    case 0: return 'Normal'
    case 25: return 'Silly'
    case 50: return 'Very Silly'
    case 75: return 'Extra Silly'
    case 100: return 'MAXIMUM SILLY'
    default: return 'Normal'
  }
})
</script>