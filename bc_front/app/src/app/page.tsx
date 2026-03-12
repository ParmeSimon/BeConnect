'use client'
import YellowButton from '@/components/Buttons/YellowButton'
import StickerLogo from '@/components/StickerLogo'
import theme from '@/theme'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Square from '@/components/Display/square'
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoCard from '@/components/Display/infoCard'
const Home = () => {
    const router = useRouter()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ backgroundColor : theme.palette.background.purple, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'visible' }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', padding: '20px' }}>
          <YellowButton label="Connexion" onClick={() => {router.push('/auth/login')}} fill={false} maxWidth="15%" />
          <YellowButton label="S'inscrire" onClick={() => {router.push('/auth/register')}} fill={true} maxWidth="15%" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '30%', justifyContent: 'center' }}>
            <StickerLogo width={250} height={100} />
            <Typography variant="h6" sx={{color: theme.palette.background.white}}>Une plateforme faite par les étudiants, pour les étudiants — et leurs futurs employeurs. L’entraide commence ici.</Typography>
            <YellowButton label="Découvrir" onClick={() => {router.push('/404')}} fill={true} maxWidth="280px" />
          </Box>
          <Box sx={{ width: '30%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: theme.palette.background.white, padding: '20px', borderRadius: '0px 80px 0px 80px', width: '100%'}}>
            <Image src="/interview.svg" alt="logo" width={750} height={250} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center', marginBottom: '-82px' }}>
          <InfoCard icon={<LightbulbIcon />} text="Recrutez plus efficacement" />
          <InfoCard icon={<RocketLaunchIcon />} text="Gagnez en visibilité" />
          <InfoCard icon={<TrendingUpIcon />} text="Suivez vos canditatures" />
        </Box>
      </Box>
      <Box sx={{marginTop:'150px', display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', gap : 5 }}>
        <Square title="Pour les etudiants" description="+ de 9000 offres" />
        <Square title="Pour les entreprises" description="+ de 650 etudiants inscrits" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Typography variant="h5">Les Contrats</Typography>
      </Box>
    </Box>
    
  )
}

export default Home
