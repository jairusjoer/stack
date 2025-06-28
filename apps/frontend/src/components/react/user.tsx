import type { DirectusUser } from '@directus/sdk';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar.tsx';
import { PUBLIC_URL } from 'astro:env/client';
import { CircleUserRound } from 'lucide-react';

export interface Props {
  data: Omit<DirectusUser, 'last_access'>;
}

export const User = ({ data }: Props) => {
  const avatar = `${PUBLIC_URL}/assets/${data.avatar}?width=64&height=64&quality=75`;

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage
          src={avatar}
          alt=""
          width={32}
          height={32}
        />
        <AvatarFallback>
          <CircleUserRound
            color="var(--muted-foreground)"
            size={16}
          />
        </AvatarFallback>
      </Avatar>
      <div className="">
        <div className="text-sm font-semibold leading-4">
          {data.first_name}&nbsp;{data.last_name}
        </div>
        <div className="text-muted-foreground text-xs">{data.email}</div>
      </div>
    </div>
  );
};
