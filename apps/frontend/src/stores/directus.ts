import { createClient } from '@repo/directus/api/authentication.ts';
import { PUBLIC_URL } from 'astro:env/client';
import { signal } from '@preact/signals-react';

export const client = signal(await createClient(PUBLIC_URL));
