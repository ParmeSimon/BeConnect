'use client'
import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <Box component="main" sx={{ flexGrow: 1, marginTop: session ? '128px' : '0' }}>
      {children}
    </Box>
  )
}
