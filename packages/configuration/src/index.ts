import { z } from "zod";

export const SharedConfigSchema = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_SERVICE_KEY: z.string(),
    CONTACT_MAIL: z.string().optional(),
    GITHUB_PROFIL: z.string().optional(),
    LINKDIN_PROFIL: z.string().optional(),
    FACEBOOK_PROFIL: z.string().optional(),
    TWITTER_PROFIL: z.string().optional(),
    DISCORD_SERVER: z.string().optional(),
    INSTAGRAM_PROFIL: z.string().optional(),
});

export type Config = z.infer<typeof SharedConfigSchema>;
const rawConfig: Partial<Config> = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    CONTACT_MAIL: process.env.CONTACT_MAIL,
    GITHUB_PROFIL: process.env.GITHUB_PROFIL,
    LINKDIN_PROFIL: process.env.LINKDIN_PROFIL,
    FACEBOOK_PROFIL: process.env.FACEBOOK_PROFIL,
    TWITTER_PROFIL: process.env.TWITTER_PROFIL,
    INSTAGRAM_PROFIL: process.env.INSTAGRAM_PROFIL,
    DISCORD_SERVER: process.env.DISCORD_SERVER,
};
export const Config = SharedConfigSchema.parse(rawConfig);
