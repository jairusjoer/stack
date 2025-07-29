export enum Side {
  client,
  server,
}

export const Only = <Type>(side: keyof typeof Side, expression: () => Type) => {
  const value = Side[side];

  switch (value) {
    case Side.client:
      if (typeof window !== 'undefined') {
        return expression();
      }
      break;

    case Side.server:
      if (typeof window === 'undefined') {
        return expression();
      }
      break;
  }
};
