import { Alert, AlertProps } from '@mantine/core'
import { ReactNode } from 'react'

export interface UiAlertProps extends AlertProps {
  message: ReactNode
}

export function UiAlert({ message, ...props }: UiAlertProps) {
  return <Alert {...props}>{message}</Alert>
}
