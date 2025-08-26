import type { DirectusUser } from '@directus/sdk';

export interface Props {
  user: DirectusUser;
}

export const Avatar = ({ user }: Props) => {
  return <div>{user.email}</div>;
};
