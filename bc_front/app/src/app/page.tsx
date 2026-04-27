'use client'
import { Box } from '@mui/material'
import Square from '@/components/vitrine/Square'
import Panel from '@/components/vitrine/Panel'
import Carousel from '@/components/vitrine/Carousel'
import Header from '@/components/vitrine/Header'
const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Header />
      <Box sx={{marginTop:'150px', display : 'flex', flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', gap : 5, width: '70%', marginInline: 'auto' }}>
        <Square title="Pour les etudiants" description="+ de 9000 offres" />
        <Square title="Pour les entreprises" description="+ de 650 etudiants inscrits" />
      </Box>
      <Panel />
      <Carousel />
    </Box>
    
  )
}

export default Home
