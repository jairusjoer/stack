export interface Props {
  callback: ({ email, password }: { email: string; password: string }) => Promise<void>;
}

export const Auth = ({ callback }: Props) => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await callback({ email, password });
  };

  return (
    <form
      className="flex text-sm font-medium"
      onSubmit={onSubmit}
    >
      <div className="bg-background grid rounded-l-md border">
        <input
          className="h-8 px-2"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="username"
          required
          autoFocus
        />
        <hr />
        <input
          className="h-8 px-2"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />
      </div>
      <button
        className="bg-accent text-accent-foreground w-16 rounded-r-md"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};
