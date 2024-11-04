import { createDirectus, rest } from '@directus/sdk';
import type { PublicSchema } from '~/directus/collections/schema';

export default defineNuxtPlugin(() => {
  const { public: publicConfig } = useRuntimeConfig();

  const publicClient = createDirectus<PublicSchema>(publicConfig.PUBLIC_URL!).with(rest());

  if (import.meta.dev) {
    console.log(...ConsoleBadge('Directus'), 'Create public client:', publicClient);
  }

  return {
    provide: { publicClient },
  };
});
