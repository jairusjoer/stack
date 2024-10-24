import { createDirectus, rest, readItem, readItems } from '@directus/sdk';
import type { PublicSchema } from '~/directus/collections/schema';

export default defineNuxtPlugin(() => {

    const { public: publicConfig } = useRuntimeConfig();
    const publicClient = createDirectus<PublicSchema>(publicConfig.DIRECTUS_URL!).with(rest());

    return {
        provide: { publicClient, readItem, readItems },
    };
});
