import { Box, Typography } from '@mui/material'

export default function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', width: '100%', mt: 20 }}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h5">Page non trouvé</Typography>
    </Box>
  )
}
