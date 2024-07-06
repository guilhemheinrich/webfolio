import { z } from "zod";

const ConfigSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_KEY: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;
const rawConfig: Partial<Config> = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
};
export const Config = ConfigSchema.parse(rawConfig);
