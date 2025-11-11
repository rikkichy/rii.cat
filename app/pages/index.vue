<template>
    <UContainer>
        <main class="py-8">
            <div class="max-w-2xl mx-auto mb-8">
                <UCard class="text-center relative overflow-hidden p-0">
                    <!-- background (blurred avatar) -->
                    <div
                        class="absolute inset-0 bg-center bg-cover scale-110 blur-xl opacity-70 pointer-events-none"
                        style="background-image: url(&quot;/pfp.png&quot;)"
                    />

                    <!-- strong grain overlay -->
                    <div
                        class="absolute inset-0 pointer-events-none grain-strong mix-blend-hard-light opacity-[0.45]"
                    />

                    <!-- content -->
                    <div class="relative p-6">
                        <div class="relative mb-4">
                            <div class="h-32"></div>

                            <div
                                class="absolute left-1/2 -bottom-12 -translate-x-1/2"
                            >
                                <NuxtImg
                                    src="pfp.png"
                                    width="96"
                                    height="96"
                                    format="webp"
                                    loading="eager"
                                    alt="Profile Picture"
                                    class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 object-cover"
                                />
                            </div>
                        </div>

                        <div class="mt-16 space-y-4">
                            <div class="flex items-center justify-center gap-2">
                                <h1 class="text-2xl font-bold">
                                    {{ getProfileName }}
                                </h1>
                                <UTooltip text="Verified silly meow">
                                    <UIcon
                                        name="i-material-symbols-verified-rounded"
                                        class="w-6 h-6 text-primary"
                                    />
                                </UTooltip>
                            </div>

                            <p class="text-gray-600 dark:text-gray-400">
                                {{ getProfileDescription }}
                            </p>

                            <UButton
                                variant="solid"
                                color="error"
                                icon="i-ri-send-plane-2-fill"
                                label="Contact"
                                size="xl"
                                @click="openContactModal"
                            />
                        </div>
                    </div>
                </UCard>
            </div>

            <h2 class="text-lg font-semibold max-w-2xl mx-auto mb-4">
                Socials
            </h2>
            <div class="max-w-2xl mx-auto mb-8 space-y-3">
                <UButton
                    v-for="link in getSocialLinks"
                    :key="link.name"
                    block
                    color="error"
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
            </div>

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
                        <UIcon
                            name="i-ri-pencil-ruler-2-fill"
                            class="w-5 h-5"
                        />
                        <span>{{ getProjects.portfolio }}</span>
                    </div>
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                </UButton>

                <UButton
                    block
                    color="neutral"
                    variant="soft"
                    size="xl"
                    class="justify-between p-3"
                    disabled
                >
                    <div class="flex items-center gap-3">
                        <UIcon name="i-ri-chrome-fill" class="w-5 h-5" />
                        <span>{{ getProjects.xenon }}</span>
                    </div>
                    <UBadge
                        color="error"
                        variant="subtle"
                        label="Coming Soon"
                    />
                </UButton>
            </div>
        </main>

        <ClientOnly>
            <UModal v-model:open="isContactModalOpen">
                <template #default>
                    <!-- Empty default slot -->
                </template>

                <template #content>
                    <UCard>
                        <template #header>
                            <h3 class="text-lg font-semibold">
                                Business Inquiries Only
                            </h3>
                        </template>

                        <p class="text-gray-600 dark:text-gray-400 mb-4">
                            Please proceed only if you represent a company. Fan
                            mail will not be responded to :(
                        </p>

                        <template #footer>
                            <div class="flex flex-col gap-2">
                                <UButton
                                    block
                                    size="xl"
                                    color="error"
                                    @click="openEmailModal"
                                    label="I understand, continue"
                                />
                                <UButton
                                    block
                                    color="neutral"
                                    size="xl"
                                    variant="ghost"
                                    @click="isContactModalOpen = false"
                                    label="Go back.."
                                />
                            </div>
                        </template>
                    </UCard>
                </template>
            </UModal>

            <UModal v-model:open="isEmailModalOpen">
                <template #default>
                    <!-- Empty default slot -->
                </template>

                <template #content>
                    <UCard>
                        <template #header>
                            <h3 class="text-lg font-semibold">Contact</h3>
                        </template>

                        <div class="space-y-4 mb-4">
                            <UFormField label="Mail">
                                <UButton
                                    variant="ghost"
                                    icon="i-heroicons-clipboard"
                                    class="font-mono w-full dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200"
                                    @click="copyEmail"
                                >
                                    {{ runtimeConfig.public.email }}
                                </UButton>
                            </UFormField>

                            <UFormField label="Manager's Discord">
                                <UButton
                                    variant="ghost"
                                    icon="i-heroicons-clipboard"
                                    class="font-mono w-full dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200"
                                    @click="copyDiscord"
                                >
                                    {{ runtimeConfig.public.managerDiscord }}
                                </UButton>
                            </UFormField>
                        </div>

                        <p class="text-sm text-gray-500 text-center">
                            Click to copy
                        </p>
                    </UCard>
                </template>
            </UModal>
        </ClientOnly>
    </UContainer>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const toast = useToast();

definePageMeta({
    prerender: true,
});
const useCopy = async (text) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
        return false;
    }

    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error("Failed to copy:", err);
        return false;
    }
};

const isContactModalOpen = ref(false);
const isEmailModalOpen = ref(false);
const brainrotLevel = useState(
    "brainrotLevel",
    () => parseInt(runtimeConfig.public.defaultBrainrotLevel) || 0,
);

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

const getProfileName = computed(() => {
    switch (brainrotLevel.value) {
        case 0:
            return runtimeConfig.public.siteName;
        case 25:
            return "Cat :3";
        case 50:
            return "Rizzichy";
        case 75:
            return "🔫 gato mafioso";
        case 100:
            return "RIZZ MAFIA BOSS";
        default:
            return runtimeConfig.public.siteName;
    }
});

const getProfileDescription = computed(() => {
    const baseText = runtimeConfig.public.siteDescription;
    return transformText(baseText);
});

const getSocialLinks = computed(() => {
    return baseLinks.map((link) => ({
        ...link,
        name: transformSocialName(link.name),
    }));
});

const getProjects = computed(() => ({
    portfolio: transformProjectName("Commissions"),
    xenon: transformProjectName("Xenon for Twitter"),
}));

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

const transformText = (text: string) => {
    switch (brainrotLevel.value) {
        case 25:
            return `${text} :3`;
        case 50:
            return `${text} (real)`;
        case 75:
            return `${text}, professional rizzler and yapper`;
        case 100:
            return `🙀🙀🙀CAT🐈🐈🐈`;
        default:
            return text;
    }
};

const openContactModal = () => {
    isContactModalOpen.value = true;
};

const openEmailModal = () => {
    isContactModalOpen.value = false;
    isEmailModalOpen.value = true;
};

const copyEmail = async () => {
    await useCopy(runtimeConfig.public.email);
    toast.add({
        title: "Copied!",
        description: "Now my email address is somewhere in your clipboard..",
        icon: "i-ri-checkbox-multiple-fill",
        duration: 3500,
    });
    isEmailModalOpen.value = false;
};

const copyDiscord = async () => {
    await useCopy(runtimeConfig.public.managerDiscord);
    toast.add({
        title: "Copied!",
        description: "Please do not annoy my manager..",
        icon: "i-ri-checkbox-multiple-fill",
        duration: 3500,
    });
    isEmailModalOpen.value = false;
};
</script>
<style scoped>
.grain-strong {
    background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.0' numOctaves='1'/></filter>\
<rect width='100%' height='100%' filter='url(%23n)' opacity='1'/>\
</svg>");
    background-size: 110px 110px;
}
</style>
