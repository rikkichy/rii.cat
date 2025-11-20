<template>
    <UContainer>
        <main class="py-8">
            <div class="max-w-xl mx-auto mb-8">
                <UCard
                    class="text-center relative overflow-hidden rounded-3xl group ring-1 ring-gray-200 dark:ring-gray-800 border-0"
                >
                    <div
                        class="absolute inset-0 bg-gray-50 dark:bg-neutral-950 transition-colors duration-300"
                    />

                    <div
                        class="absolute inset-0 bg-center bg-cover blur-[80px] saturate-200 opacity-40 dark:opacity-50 scale-125 pointer-events-none"
                        :style="{ backgroundImage: `url('${backgroundUrl}')` }"
                    />

                    <div
                        class="absolute inset-0 bg-white/60 dark:bg-transparent transition-colors duration-300"
                    />

                    <div
                        v-if="!reducedMotion"
                        class="absolute inset-0 pointer-events-none grain mix-blend-overlay opacity-40 dark:opacity-60"
                    />

                    <div class="relative p-1">
                        <UButton
                            color="primary"
                            variant="outline"
                            class="absolute top-2 right-4 z-10 font-bold rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border-gray-200 dark:border-gray-700"
                            size="xl"
                            icon="i-ri-settings-2-fill"
                            @click="isSettingsModalOpen = true"
                        />

                        <div class="relative mb-4">
                            <div class="h-32"></div>
                            <div
                                class="absolute left-1/2 -bottom-12 -translate-x-1/2"
                            >
                                <NuxtImg
                                    src="/pfp.png"
                                    width="512"
                                    height="512"
                                    loading="eager"
                                    alt="Profile Picture"
                                    class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-2xl object-cover relative z-10"
                                />
                                <div
                                    class="absolute inset-0 rounded-full blur-xl opacity-50 dark:opacity-70 -z-10 scale-95"
                                    :style="{
                                        backgroundImage: `url('${backgroundUrl}')`,
                                        backgroundSize: 'cover',
                                    }"
                                ></div>
                            </div>
                        </div>

                        <div
                            class="mt-16 space-y-4 text-gray-900 dark:text-white"
                        >
                            <div class="flex items-center justify-center gap-2">
                                <h1 class="text-2xl font-bold tracking-tight">
                                    {{ getProfileName }}
                                </h1>
                                <UTooltip text="Verified silly meow">
                                    <UIcon
                                        name="i-material-symbols-verified-rounded"
                                        class="w-6 h-6 text-primary-500 dark:text-primary-400"
                                    />
                                </UTooltip>
                            </div>

                            <p
                                class="text-gray-600 dark:text-gray-300 font-medium"
                            >
                                {{ getProfileDescription }}
                            </p>

                            <UButton
                                variant="solid"
                                color="primary"
                                icon="i-ri-send-plane-2-fill"
                                label="Contact"
                                size="xl"
                                class="font-bold shadow-lg shadow-primary-500/20"
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
                <template v-for="link in getSocialLinks" :key="link.name">
                    <div
                        v-if="link.icon === 'i-ri-discord-fill'"
                        class="flex gap-2"
                    >
                        <UButton
                            block
                            color="primary"
                            size="xl"
                            variant="ghost"
                            class="justify-between p-3 flex-1"
                            @click="navigateTo(link.url, { external: true })"
                        >
                            <div class="flex items-center gap-3">
                                <UIcon :name="link.icon" class="w-5 h-5" />
                                <span>{{ link.name }}</span>
                            </div>
                            <UIcon
                                name="i-heroicons-arrow-right"
                                class="w-4 h-4"
                            />
                        </UButton>
                        <UTooltip text="Discord Rules">
                            <UButton
                                color="neutral"
                                variant="soft"
                                size="xl"
                                icon="i-heroicons-book-open"
                                class="px-4"
                                to="/rules"
                            />
                        </UTooltip>
                    </div>
                    <UButton
                        v-else
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
            </div>
        </main>

        <ClientOnly>
            <UModal v-model:open="isContactModalOpen">
                <template #default> </template>

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
                                    color="primary"
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
                <template #default> </template>

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
const img = useImage();
const reducedMotion = useState("reducedMotion", () => false); // Add state here

useHead({
    title: "Rikkichy | YouTube, Twitch, Instagram, TikTok",
    meta: [
        {
            name: "description",
            content:
                "All Rikkichy links to YouTube, Instagram, TikTok and Twitter",
        },
    ],
});
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
const isSettingsModalOpen = useState("settingsModal", () => false);
const isContactModalOpen = ref(false);
const isEmailModalOpen = ref(false);

const brainrotLevel = useState(
    "brainrotLevel",
    () => parseInt(runtimeConfig.public.defaultBrainrotLevel) || 0,
);

const backgroundUrl = computed(() => {
    return img("/pfp.png", {
        width: 64,
        quality: 50,
        format: "webp",
    });
});

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
.grain {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
}
</style>
