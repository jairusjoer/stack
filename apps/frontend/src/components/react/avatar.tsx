import type { DirectusUser } from '@directus/sdk';

export interface Props {
  user: DirectusUser;
  callback: () => Promise<void>;
}

export const Avatar = ({ user, callback }: Props) => {
  console.log(user);

  return (
    <div className="text-center">
      <div>Hello there 👋</div>
      <div className="mb-2 font-bold">{user.email}</div>
      <button
        className="bg-accent text-accent-foreground rounded-md px-4 font-medium leading-8"
        onClick={callback}
      >
        Logout
      </button>
    </div>
  );
};
