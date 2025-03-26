import { schemaApply, schemaDiff, schemaSnapshot } from '@directus/sdk';
import { Try } from '~/composables/Try';
import type { createAdminClient } from './authentication';

// https://docs.directus.io/reference/system/schema.html#schema

/**
 * Creates a schema snapshot using the Directus admin client.
 * Saves the schema to `directus/schema.json`.
 *
 * @param client - The Directus admin client instance
 * @returns The schema snapshot
 */
export async function retrieveSchemaSnapshot(client: Awaited<ReturnType<typeof createAdminClient>>) {
  const { writeFile } = await import('fs/promises');

  const schema = await client.request(schemaSnapshot());
  await writeFile('directus/schema.json', JSON.stringify(schema, null, 2));

  console.info('Directus', 'retrieved schema snapshot');

  return schema;
}

/**
 * Retrieves the schema difference using the Directus admin client.
 *
 * @param client - The Directus admin client instance
 * @returns The schema difference
 */
export async function retrieveSchemaDifference(client: Awaited<ReturnType<typeof createAdminClient>>) {
  const schema = await retrieveSchemaSnapshot(client);
  const diff = await client.request(schemaDiff(schema!));

  console.info('Directus', 'retrieved schema difference');

  return diff;
}

/**
 * Applies the schema difference to the Directus server.
 * Logs the result of the operation.
 *
 * @param client - The Directus admin client instance
 * @returns Promise that resolves when the schema difference is applied
 */
export async function applySchemaDifference(client: Awaited<ReturnType<typeof createAdminClient>>) {
  const diff = await retrieveSchemaDifference(client);

  if (diff?.diff) {
    const [_apply, applyError] = await Try(() => client.request(schemaApply(diff!)));

    if (applyError) {
      return console.error('Directus', 'failed to apply schema difference', applyError);
    }

    console.info('Directus', 'applied schema difference');
  } else {
    console.info('Directus', 'identified no schema difference');
  }
}
