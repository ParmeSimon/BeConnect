import theme from "@/theme"
import { Box, Typography, Divider } from "@mui/material"
const Panel = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, marginTop:'30px' }}>
        <Typography variant="h5">Les Contrats</Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2, backgroundColor: theme.palette.background.purple, padding: 2, borderRadius:'10px', width: '80%'}}>
          <Box sx={{flex:1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, color: theme.palette.background.white}}>
            <Typography variant="h6">Alternances</Typography>
            <Typography variant="body1">des offres spcélisé pour chaque domaines</Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ 
                    borderRightWidth: 3, 
                    borderColor: theme.palette.background.yellow,
                    height: '100px',
                    opacity: 1 
                }} 
          />
          <Box sx={{flex:1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, color: theme.palette.background.white}}>
            <Typography variant="h6">Stages</Typography>
            <Typography variant="body1">tout type de contrats rémunérés ou non </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ 
                    borderRightWidth: 3, 
                    borderColor: theme.palette.background.yellow,
                    height: '100px',
                    opacity: 1 
                }} 
          />
          <Box sx={{flex:1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, color: theme.palette.background.white}}>
            <Typography variant="h6">Emplois</Typography>
            <Typography variant="body1">des offre qui débouche sur un emploi à plein temps</Typography>
          </Box>
        </Box>
      </Box>
    )
}

export default Panel
