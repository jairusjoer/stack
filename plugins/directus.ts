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

    if (import.meta.dev) {
      await retrieveSchemaSnapshot(provide.directus.adminClient);
    }
  }

  return { provide };
});

const createPublicClient = (runtimeConfig: RuntimeConfig) => {
  return createDirectus<PublicSchema>(runtimeConfig.public.url).with(rest());
};

const createAdminClient = async (runtimeConfig: RuntimeConfig) => {
  const client = createDirectus(runtimeConfig.public.url).with(authentication()).with(rest());
  await Try(() => client.login(runtimeConfig.admin.email, runtimeConfig.admin.password));

  return client;
};

const retrieveSchemaSnapshot = async (client: Awaited<ReturnType<typeof createAdminClient>>) => {
  const { readFile, writeFile } = await import('fs/promises');

  let [schema, schemaError] = await Try<SchemaSnapshotOutput>(async () =>
    JSON.parse(await readFile('directus/schema.json', 'utf-8')),
  );

  if (schemaError) {
    schema = await client.request(schemaSnapshot());
    await writeFile('directus/schema.json', JSON.stringify(schema, null, 2));
    console.info('Directus', 'created schema snapshot');
  }

  let [diff] = await Try(() => client.request(schemaDiff(schema!)));

  if (diff?.diff) {
    schema = await client.request(schemaSnapshot());
    await writeFile('directus/schema.json', JSON.stringify(schema, null, 2));
    console.info('Directus', 'updated schema snapshot');
  }

  return schema;
};
