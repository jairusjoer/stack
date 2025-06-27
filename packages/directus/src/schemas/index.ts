import type { Example } from './example';

export interface PublicSchema {
  examples: Example[];
}

export interface AuthenticatedSchema extends PublicSchema {
  // ...
}
