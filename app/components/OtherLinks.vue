<template>
    <div>
        <h2 class="text-lg font-semibold max-w-2xl mx-auto mb-4">Other</h2>
        <div class="max-w-2xl mx-auto mb-8 space-y-3">
            <UButton
                block
                color="neutral"
                variant="ghost"
                size="xl"
                truncate
                class="justify-between p-3"
                @click="navigateTo('/portfolio')"
            >
                <div class="flex items-center gap-3">
                    <UIcon name="i-ri-pencil-ruler-2-fill" class="w-5 h-5" />
                    <span>{{ getProjects.portfolio }}</span>
                </div>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const brainrotLevel = useState<number>("brainrotLevel");

const transformProjectName = (name: string) => {
    switch (brainrotLevel.value) {
        case 25:
            return `Nyah ${name}`;
        case 50:
            return `I'VE SEEN THIS ${name} BEFORE ❌🟥`;
        case 75:
            return `Put the ${name} in the bag 💀🍟`;
        case 100:
            return `🐈🐈 hawk tuah mah ${name.toUpperCase()} 🐈🐈`;
        default:
            return name;
    }
};

const getProjects = computed(() => ({
    portfolio: transformProjectName("Commissions"),
}));
</script>
