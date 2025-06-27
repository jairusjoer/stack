import { authentication, createDirectus, rest, type LocalLoginPayload } from '@directus/sdk';
import { Try } from '@repo/utils/try';
import type { AdminSchemaInterface, PublicSchemaInterface } from '../schemas';

// https://docs.directus.io/reference/authentication.html

export function createPublicClient(options: { url: string }) {
  return createDirectus<PublicSchemaInterface>(options.url).with(rest());
}

export async function createAdminClient(options: { url: string; payload: LocalLoginPayload }) {
  const client = createDirectus<AdminSchemaInterface>(options.url).with(authentication()).with(rest());

  await Try(() => client.login(options.payload));

  return client;
}
