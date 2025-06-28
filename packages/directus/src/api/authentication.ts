import { authentication, createDirectus, rest, type LocalLoginPayload } from '@directus/sdk';;
import type { AuthenticatedSchema, PublicSchema } from '../schemas';
import { Try } from '@repo/utils/try.ts';

// https://docs.directus.io/reference/authentication.html

export function createPublicClient(options: { url: string }) {
  return createDirectus<PublicSchema>(options.url).with(rest());
}

export async function createAuthenticatedClient(options: { url: string; payload: LocalLoginPayload }) {
  const client = createDirectus<AuthenticatedSchema>(options.url).with(authentication()).with(rest());

  await Try(() => client.login(options.payload));

  return client;
}
