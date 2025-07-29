import { client } from '@/stores/directus';

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
    <form onSubmit={login}>
      <input
        type="email"
        name="email"
        id="email"
        defaultValue="admin@example.com"
        autoComplete='username'
        required
        autoFocus
      />
      <input
        type="password"
        name="password"
        id="password"
        defaultValue="d1r3ctu5"
        autoComplete='current-password'
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};
