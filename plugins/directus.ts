import { createDirectus, rest } from '@directus/sdk';
import type { PublicSchema } from '~/directus/collections/schema';

export default defineNuxtPlugin(() => {
  const { public: publicConfig } = useRuntimeConfig();

  const publicClient = createDirectus<PublicSchema>(publicConfig.PUBLIC_URL!).with(rest());

  if (import.meta.dev) {
    console.info(...ConsoleBadge('directus', '#64f'), 'Created public client');
  }

  return {
    provide: { publicClient },
  };
});
