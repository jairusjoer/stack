import { authentication, createDirectus, rest, type ClientOptions } from '@directus/sdk';
import type { Schema } from '../schemas';
import { Only } from '@repo/utils/only.ts';

// https://docs.directus.io/reference/authentication.html

export async function createClient(url: string, options?: ClientOptions) {
  const client = createDirectus<Schema>(url, options)
    .with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
    .with(rest());

  await Only('client', async () => await client.refresh());

  return client;
}
