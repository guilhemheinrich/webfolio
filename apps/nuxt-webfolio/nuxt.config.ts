// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            ADMIN: Boolean(process.env.ADMIN) || false,
            SUPABASE_URL: process.env.SUPABASE_URL || "",
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
            CONTACT_MAIL: process.env.CONTACT_MAIL || "",
            GITHUB_PROFIL: process.env.GITHUB_PROFIL || "",
            LINKDIN_PROFIL: process.env.LINKDIN_PROFIL || "",
            FACEBOOK_PROFIL: process.env.FACEBOOK_PROFIL || "",
            TWITTER_PROFIL: process.env.TWITTER_PROFIL || "",
            INSTAGRAM_PROFIL: process.env.INSTAGRAM_PROFIL || "",
            DISCORD_SERVER: process.env.DISCORD_SERVER || "",
        },
        private: {
            SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
        },
    },
    hooks: {
        ready: async (params: any) => {
            console.log("nuxt ready hook");
        },
    },
});
