import { createDirectus, rest, } from '@directus/sdk';
import type { PublicSchema } from './schema';

// Client with REST support
export const PublicClient = createDirectus<PublicSchema>('http://localhost:8055').with(rest());
