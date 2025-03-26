import { authentication, createDirectus, rest } from '@directus/sdk';
import { Try } from '~/composables/Try';
import type { RuntimeConfig } from '@nuxt/schema';
import type { AdminSchemaInterface, PublicSchemaInterface } from '../collections/schema';

// https://docs.directus.io/reference/authentication.html

/**
 * Creates a public client for Directus.
 *
 * @param runtimeConfig - The runtime configuration containing the public URL
 * @returns A Directus client instance configured with REST
 */
export function createPublicClient(runtimeConfig: RuntimeConfig) {
  return createDirectus<PublicSchemaInterface>(runtimeConfig.public.url).with(rest());
}

/**
 * Creates an admin client for Directus.
 *
 * @param runtimeConfig - The runtime configuration containing public and admin details
 * @returns An authenticated Directus client instance with REST
 */
export async function createAdminClient(runtimeConfig: RuntimeConfig) {
  const client = createDirectus<AdminSchemaInterface>(runtimeConfig.public.url).with(authentication()).with(rest());
  await Try(() => client.login(runtimeConfig.admin.email, runtimeConfig.admin.password));

  return client;
}
