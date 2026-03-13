import { DefaultSession, NextAuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'

export interface ApiUser {
  id?: string
  lastName?: string
  firstName?: string
  email?: string
  roles: string[]
  token?: string
  refresh_token?: string
}

declare module 'next-auth' {
  interface Session {
    user: ApiUser & DefaultSession['user']
  }
  interface User extends ApiUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    firstName?: string
    lastName?: string
    email?: string
    roles: string[]
    token?: string
    refresh_token?: string
  }
}

export const authenticate = async (
  email: string,
  password: string
): Promise<{ user: ApiUser; token: string; refresh_token: string }> => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/authentication_token`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  ).then(async res => {
    let response = await res.json()
    if (res.status === 200) {
      return response
    }
    if (res.status === 500) {
      throw { status: 500, message: response['detail'] }
    }
    if (res.headers.has('x-ratelimit-remaining')) {
      response.message += ` ${res.headers.get(
        'x-ratelimit-remaining'
      )} remaining attempts.`
    }
    if (res.headers.has('retry-after')) {
      const lockTime = Number(res.headers.get('retry-after'))
      const rem = lockTime % 60
      response.message = `${response['detail']}, retry after ${Math.floor(
        lockTime / 60
      )}${
        rem > 0 ? ':' + rem.toString().padStart(2, '0') : ''
      } mn or contact an administrator.`
    }
    throw response
  })
}

export const refreshToken = async (
  refresh_token: string
): Promise<{ token: string; refresh_token: string }> => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh`, {
    method: 'POST',
    body: JSON.stringify({
      refresh_token: refresh_token
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(async res => {
    const response = await res.json()
    if (res.status === 200) {
      return response
    }
    if (res.status === 500) {
      throw { status: 500, message: response['detail'] }
    }
    throw response
  })
}

function decodeJwtPayload(token: string): Record<string, any> {
  const base64Payload = token.split('.')[1]
  const payload = Buffer.from(base64Payload, 'base64').toString('utf-8')
  return JSON.parse(payload)
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'BeConnect',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials): Promise<User | null> {
        
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
      
        try {
          const response = await authenticate(credentials.email, credentials.password);
      
          if (response && response.token) {
            const jwtPayload = decodeJwtPayload(response.token)
            return {
              id: jwtPayload.username || credentials.email || 'user',
              email: jwtPayload.username || credentials.email || '',
              firstName: response.user?.firstName || '',
              lastName: response.user?.lastName || '',
              roles: jwtPayload.roles || [],
              token: response.token,
              refresh_token: response.refresh_token
            }
          }
          return null;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: async (params: {
      token: JWT
      user: User
      trigger?: 'signIn' | 'signUp' | 'update'
      session?: any
    }): Promise<JWT> => {
      if (params.user) {
        params.token.firstName = params.user.firstName
        params.token.lastName = params.user.lastName
        params.token.email = params.user.email!
        params.token.roles = params.user.roles
        params.token.token = params.user.token
        params.token.refresh_token = params.user.refresh_token
      }

      if (params.trigger == 'update' && params.session) {
        params.token.token = params.session.token
      }

      return params.token
    },
    session: async (params: {
      session: Session
      token: JWT
    }): Promise<Session | DefaultSession> => {
      params.token.firstName = params.token.firstName
      params.token.lastName = params.token.lastName
      params.session.user.email = params.token.email
      params.session.user.roles = params.token.roles
      params.session.user.token = params.token.token
      params.session.user.refresh_token = params.token.refresh_token

      return params.session
    }
  },
  pages: { signIn: '/auth/login', error: '/auth/login' }
}
