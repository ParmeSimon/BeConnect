import { refreshToken } from '@/utils/security'
import { useSession } from 'next-auth/react'

export type ApiFetch = (
  endpoint: string,
  method?: string,
  payload?: any
) => Promise<Response>

export const useFetcher = () => {
  const { data: session, update } = useSession()

  const apiFetch = async (
    endpoint: string,
    method?: string,
    payload?: any
  ): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method: method ?? 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type':
          method === 'PATCH'
            ? 'application/merge-patch+json'
            : 'application/json',
        Authorization: `Bearer ${session?.user.token}`
      },
      body: payload ? JSON.stringify(payload) : undefined
    }).then(async res => {
      //no response on DELETE
      const response = res.status !== 204 && (await res.clone().json())
      if (
        response.message === 'Expired JWT Token' &&
        session?.user.refresh_token
      ) {
        return await refreshToken(session?.user.refresh_token!).then(
          async res => {
            await update({
              token: res.token,
              refresh_token: res.refresh_token
            })
            return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
              method: method ?? 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type':
                  method === 'PATCH'
                    ? 'application/merge-patch+json'
                    : 'application/json',
                Authorization: `Bearer ${res.token}`
              },
              body: payload ? JSON.stringify(payload) : undefined
            })
          }
        )
      } else {
        return res
      }
    })
  }

  return { apiFetch }
}
