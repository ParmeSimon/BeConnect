'use client'
import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import theme from '@/theme'
import { routes } from '@/utils/navigation'
import Menu from '@/components/Menu'
import MenuSettings from '@/components/MenuSettings'
export default function MainContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <Box component="main" sx={{ flexGrow: 1, marginTop: session ? '128px' : '0', position: 'relative', overflow: 'hidden' }}>
      {session && <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 637,
          height: 637,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.background.purple} 0%, ${theme.palette.background.purple} 70%)`,
          filter: 'blur(220px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
          <MenuSettings routes={routes} />
          
          {/* <Menu routes={routes} /> */}
        </Box>
        {children}
      </Box>
    </Box>
  )
}
