import { type JSX } from 'react';

export interface Props {
  children?: React.ReactNode;
  data: string;
  labels: {
    title: string;
  };
}

export const Example = ({ children, data, labels }: Props): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded bg-blue-600 px-2">{labels.title}</span>
      <pre>{data}</pre>
      {children && <div>{children}</div>}
    </div>
  );
};
