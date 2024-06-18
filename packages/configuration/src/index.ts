import { z } from "zod";

const ConfigSchema = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
});

const hi = "hi";
export type Config = z.infer<typeof ConfigSchema>;
const rawConfig: Partial<Config> = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
};
export const Config = ConfigSchema.parse(rawConfig);
