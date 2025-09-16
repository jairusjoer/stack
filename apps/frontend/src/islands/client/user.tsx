import { Avatar } from '../../components/react/avatar';
import { Auth, type Props as AuthProps } from '../../components/react/auth';
import { readMe, type DirectusUser } from '@directus/sdk';
import { client } from '../../stores/directus';
import { useSignalEffect, useSignals } from '@preact/signals-react/runtime';
import { signal } from '@preact/signals-react';
import { Try } from '@stack/shared/utils';

export interface State {
  user: DirectusUser | null;
  loading: boolean;
}

const login: AuthProps['callback'] = async ({ email, password }) => {
  const { error: loginError } = await Try(() => client.value.login({ email, password }));

  if (loginError) {
    return console.error(loginError);
  }

  location.reload();
};

const logout = async () => {
  await client.value.logout();

  location.reload();
};

const state = signal<State>({ user: null, loading: true });

const fetchMe = async () => {
  const { data } = await Try(() => client.value.request(readMe()));

  state.value = { user: data as DirectusUser, loading: false };
};

export const User = () => {
  useSignals();

  useSignalEffect(() => {
    fetchMe();
  });

  const render = () => {
    if (state.value.loading) return <div className="bg-accent size-8 animate-spin" />;

    if (!state.value.user) return <Auth callback={login} />;

    return (
      <Avatar
        user={state.value.user}
        callback={logout}
      />
    );
  };

  return <>{render()}</>;
};
