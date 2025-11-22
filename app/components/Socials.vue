<template>
    <div>
        <h2 class="text-lg font-semibold max-w-2xl mx-auto mb-4">Socials</h2>
        <div class="max-w-2xl mx-auto mb-8 space-y-3">
            <template v-for="link in getSocialLinks" :key="link.name">
                <UButton
                    block
                    color="primary"
                    size="xl"
                    variant="ghost"
                    class="justify-between p-3"
                    @click="navigateTo(link.url, { external: true })"
                >
                    <div class="flex items-center gap-3">
                        <UIcon :name="link.icon" class="w-5 h-5" />
                        <span>{{ link.name }}</span>
                    </div>
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                </UButton>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const brainrotLevel = useState<number>("brainrotLevel");

const baseLinks = [
    {
        name: "Discord",
        icon: "i-ri-discord-fill",
        url: runtimeConfig.public.discordUrl,
    },
    {
        name: "Twitch",
        icon: "i-ri-twitch-fill",
        url: runtimeConfig.public.twitchUrl,
    },
    {
        name: "Twitter",
        icon: "i-ri-twitter-x-fill",
        url: runtimeConfig.public.twitterUrl,
    },
];

const transformSocialName = (name: string) => {
    switch (brainrotLevel.value) {
        case 25:
            return `${name} :3`;
        case 50:
            return `I like my ${name} drippy 🧀`;
        case 75:
            return `I bought my ${name}, in Egypt`;
        case 100:
            return `🐈🐈 hawk tuah mah ${name.toUpperCase()} 🐈🐈`;
        default:
            return name;
    }
};

const getSocialLinks = computed(() => {
    return baseLinks.map((link) => ({
        ...link,
        name: transformSocialName(link.name),
    }));
});
</script>
