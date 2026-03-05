'use client'
import { fetcher } from '@/utils/fetch'
import { refreshToken } from '@/utils/security'
import { signOut, useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { SWRConfig } from 'swr'

type Props = {
  children?: React.ReactNode
}

export const SWRProvider = ({ children }: Props) => {
  const { data: session, update } = useSession()
  const { enqueueSnackbar } = useSnackbar()
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        refreshInterval: 1000 * 60 * 3,
        onError: async error => {
          if (
            error.message === 'Expired JWT Token' &&
            session?.user.refresh_token
          ) {
            if (
              session?.user.roles.length > 1 &&
              (session?.user.roles.includes('ROLE_ADMIN') ||
                session?.user.roles.includes('ROLE_GESTIONNAIRE'))
            ) {
              await refreshToken(session?.user.refresh_token)
                .then(async res => await update({ token: res.token }))
                .catch(e => {
                  enqueueSnackbar(e, {
                    variant: 'error'
                  })
                })
            } else {
              await signOut()
            }
          } else {
            enqueueSnackbar(
              error.message !== undefined ? error.message : error,
              {
                variant: 'error'
              }
            )
          }
        }
      }}
    >
      {children}
    </SWRConfig>
  )
}
