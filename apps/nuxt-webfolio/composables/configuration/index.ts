import { SharedConfigSchema } from "configuration";
import { z } from "zod";
// const ConfigSchema = z.object({
//     ADMIN: z.boolean(),
// });

export function useConfig() {
    // console.log("into useCOnfig");
    // const MergedSchema = SharedConfigSchema.merge(ConfigSchema);

    const config = useRuntimeConfig();
    // console.log("before");
    // const parsedConfig = MergedSchema.parse({
    //     ...config.public,
    //     ...config.private,
    // });
    return {
        ...config.public,
        ...config.private,
    };
}
