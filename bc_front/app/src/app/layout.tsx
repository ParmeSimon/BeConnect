import theme from '@/theme'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { NextAuthProvider } from '@/providers/NextAuthProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { SWRProvider } from '@/providers/SwrProvider'
import { Box } from '@mui/material'
import Header from '@/components/Header/Header'
import { NotificationProvider } from '@/providers/NotificationProvider'
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <NextAuthProvider>
              <NotificationProvider>
                <SWRProvider>
                  <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header />
                    <Box component="main" sx={{ flexGrow: 1 }}>
                      {children}
                    </Box>
                  </Box>
                </SWRProvider>
              </NotificationProvider>
            </NextAuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
