import { createAdminClient, createPublicClient } from '~/directus/api/authentication';

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();

  const provide: {
    directus: {
      publicClient: ReturnType<typeof createPublicClient>;
      adminClient?: Awaited<ReturnType<typeof createAdminClient>>;
    };
  } = {
    directus: {
      publicClient: createPublicClient(runtimeConfig),
    },
  };

  if (import.meta.server) {
    provide.directus.adminClient = await createAdminClient(runtimeConfig);
  }

  return { provide };
});
