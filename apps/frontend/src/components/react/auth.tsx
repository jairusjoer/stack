import { client } from '../../stores/directus';

export const Login = () => {
  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await client.value.login({ email, password });
    location.reload();
  };

  return (
    <form
      className="flex text-sm font-medium"
      onSubmit={login}
    >
      <div className="grid rounded-l-md border">
        <input
          className="h-8 px-1"
          type="email"
          name="email"
          id="email"
          // defaultValue="admin@example.com"
          autoComplete="username"
          required
          autoFocus
        />
        <hr />
        <input
          className="h-8 px-1"
          type="password"
          name="password"
          id="password"
          // defaultValue="d1r3ctu5"
          autoComplete="current-password"
          required
        />
      </div>
      <div className="grid rounded-r-md bg-blue-600 text-white">
        <button
          className="h-8 px-4"
          type="submit"
        >
          Sign Up
        </button>
        <hr />
        <button
          className="h-8 px-4"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};
