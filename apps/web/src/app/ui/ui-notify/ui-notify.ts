import { NotificationData, showNotification } from '@mantine/notifications';

export function notify(props: NotificationData) {
  return showNotification({
    color: 'blue',
    ...props,
  });
}

export function notifySuccess({
  title = 'Success',
  message,
  ...props
}: NotificationData) {
  return notify({
    color: 'green',
    ...props,
    title,
    message,
  });
}

export function notifyError({
  title = 'An error occurred',
  message,
  ...props
}: NotificationData) {
  return notify({
    color: 'red',
    ...props,
    title,
    message,
  });
}
