import { NotificationData } from '@mantine/notifications/lib';
import { ReactNode } from 'react';
import { ellipsify } from '../../solana/ellipsify';
import { notifySuccess } from '../ui-notify/ui-notify';
import { UiExplorer } from './ui-explorer';

export function UiExplorerLink({
  path,
  label,
  children,
}: {
  path: string;
  label: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <UiExplorer label={label} path={path} />
    </div>
  );
}

export function notifySignatureLink({
  signature,
  ...props
}: Omit<NotificationData, 'message'> & { signature: string }) {
  return notifySuccess({
    ...props,
    message: (
      <UiExplorerLink label={ellipsify(signature)} path={`tx/${signature}`}>
        View transaction {ellipsify(signature)}.
      </UiExplorerLink>
    ),
  });
}
