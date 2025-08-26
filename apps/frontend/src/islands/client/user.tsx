import { Avatar } from '../../components/react/avatar';
import { Login } from '../../components/react/auth';
import { readMe, type DirectusUser } from '@directus/sdk';
import { client } from '../../stores/directus';
import { useSignalEffect, useSignals } from '@preact/signals-react/runtime';
import { signal } from '@preact/signals-react';
import { Try } from '@stack/shared/utils';
import { Skeleton } from '@stack/ui/components/ui';

export interface State {
  user: DirectusUser | null;
  loading: boolean;
}

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
    if (state.value.loading) return <Skeleton className="h-8 w-40" />;
    if (!state.value.user) return <Login />;

    return <Avatar user={state.value.user} />;
  };

  return <>{render()}</>;
};
