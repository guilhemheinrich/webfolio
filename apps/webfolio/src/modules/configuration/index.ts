import { Config as shared_config } from 'configuration';
import { z } from 'zod';

const ConfigSchema = z.object({
  DEV: z.boolean(),
});

export type ConfigWebfolio = z.infer<typeof ConfigSchema>;
const rawConfig: Partial<ConfigWebfolio> = {
  DEV: Boolean(process.env.DEV),
};

export const ConfigWebfolio = ConfigSchema.parse(rawConfig);

export const Config = {
  ...shared_config,
  ...ConfigWebfolio,
};
