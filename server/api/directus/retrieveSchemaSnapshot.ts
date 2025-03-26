import { createAdminClient } from '~/directus/api/authentication';
import { retrieveSchemaSnapshot } from '~/directus/api/schema';

export default defineEventHandler(async (event) => {
  if (import.meta.dev) {
    const config = useRuntimeConfig(event);
    const client = await createAdminClient(config);

    return await retrieveSchemaSnapshot(client);
  }
});
