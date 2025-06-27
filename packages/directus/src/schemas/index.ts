import type { ExampleInterface } from './example';

export interface PublicSchemaInterface {
  examples: ExampleInterface[];
}

export interface AdminSchemaInterface extends PublicSchemaInterface {
  examples: ExampleInterface[];
}
