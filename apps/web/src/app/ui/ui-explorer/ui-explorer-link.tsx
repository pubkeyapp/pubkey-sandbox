import { ReactNode } from 'react';
import { UiExplorer } from './ui-explorer';

export function UiExplorerLink({
  path,
  label,
  children,
}: {
  path: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <UiExplorer label={label} path={path} />
    </div>
  );
}
