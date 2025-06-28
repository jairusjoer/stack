import { schemaApply, schemaDiff, schemaSnapshot } from '@directus/sdk';
import { Try } from '@repo/utils/try.ts';
import type { createAuthenticatedClient } from './authentication';

// https://docs.directus.io/reference/system/schema.html#schema

export async function retrieveSchemaSnapshot(client: Awaited<ReturnType<typeof createAuthenticatedClient>>) {
  const { writeFile } = await import('fs/promises');

  const schema = await client.request(schemaSnapshot());
  await writeFile('directus/schema.json', JSON.stringify(schema, null, 2));

  console.info('Directus', 'retrieved schema snapshot');

  return schema;
}

export async function retrieveSchemaDifference(client: Awaited<ReturnType<typeof createAuthenticatedClient>>) {
  const schema = await retrieveSchemaSnapshot(client);
  const diff = await client.request(schemaDiff(schema!));

  console.info('Directus', 'retrieved schema difference');

  return diff;
}

export async function applySchemaDifference(client: Awaited<ReturnType<typeof createAuthenticatedClient>>) {
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
