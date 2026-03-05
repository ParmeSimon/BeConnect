'use client'
import { SnackbarProvider } from 'notistack'

type Props = {
  children?: React.ReactNode
}

export const NotificationProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      {children}
    </SnackbarProvider>
  )
}
