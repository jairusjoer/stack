import {
  authentication,
  createDirectus,
  rest,
  schemaDiff,
  schemaSnapshot,
  type SchemaSnapshotOutput,
} from '@directus/sdk';
import type { PublicSchema } from '~/directus/collections/schema';
import type { RuntimeConfig } from '@nuxt/schema';

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
    await retrieveSchemaSnapshot(provide.directus.adminClient);
  }

  return { provide };
});

const createPublicClient = (runtimeConfig: RuntimeConfig) => {
  return createDirectus<PublicSchema>(runtimeConfig.public.url).with(rest());
};

const createAdminClient = async (runtimeConfig: RuntimeConfig) => {
  const client = createDirectus(runtimeConfig.public.url).with(authentication()).with(rest());
  await client.login(runtimeConfig.admin.email, runtimeConfig.admin.password);

  return client;
};

const retrieveSchemaSnapshot = async (client: Awaited<ReturnType<typeof createAdminClient>>) => {
  const { readFile, writeFile } = await import('fs/promises');
  let schema: SchemaSnapshotOutput;

  try {
    schema = JSON.parse(await readFile('directus/schema.json', 'utf-8'));
  } catch {
    schema = await client.request(schemaSnapshot());
    await writeFile('directus/schema.json', JSON.stringify(schema, null, 2));
    console.info('Directus', 'created schema snapshot');
  }

  try {
    const { diff } = await client.request(schemaDiff(schema));

    if (diff) {
      schema = await client.request(schemaSnapshot());
      await writeFile('directus/schema.json', JSON.stringify(schema, null, 2));
      console.info('Directus', 'updated schema snapshot');
    }
  } catch (error: any) {
    for (const { message } of error.errors) {
      console.warn('Directus', 'rejected schema snapshot:', message);
    }
  }

  return schema;
};
