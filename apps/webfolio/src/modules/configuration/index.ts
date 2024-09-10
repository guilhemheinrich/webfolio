import { Config as shared_config } from 'configuration';
import { z } from 'zod';

const ConfigSchema = z.object({
  ADMIN: z.boolean(),
});

export type ConfigWebfolio = z.infer<typeof ConfigSchema>;
const rawConfig: Partial<ConfigWebfolio> = {
  ADMIN: Boolean(JSON.parse(process.env.ADMIN ?? '')),
};

export const ConfigWebfolio = ConfigSchema.parse(rawConfig);

export const Config = {
  ...shared_config,
  ...ConfigWebfolio,
};

console.log(process.env.ADMIN);
console.log(Boolean(JSON.parse(process.env.ADMIN ?? '')));
