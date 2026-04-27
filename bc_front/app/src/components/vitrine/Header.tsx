import { Box } from "@mui/material"
import YellowButton from "../Buttons/YellowButton"
import StickerLogo from "../StickerLogo"
import Typography from "@mui/material/Typography"
import theme from "@/theme"
import { useRouter } from "next/navigation"
import InfoCard from "./InfoCard"
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Image from "next/image"
const Header = () => {
    const router = useRouter()
    return (
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
                <Box sx={{ width: '30%'}}>
                    <Image src="/meeting.jpg" alt="meeting" width={750} height={250} style={{ width: '100%', height: 'auto',borderRadius: '0px 80px 0px 80px', objectFit: 'cover' }} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'space-between', alignItems: 'center', marginBottom: '-82px', width: '70%', marginInline: 'auto' }}>
                <InfoCard icon={<LightbulbIcon sx={{color:'yellow'}} />} text="Recrutez plus efficacement" />
                <InfoCard icon={<RocketLaunchIcon sx={{color:'red'}}/>} text="Gagnez en visibilité" />
                <InfoCard icon={<TrendingUpIcon sx={{color:'green'}}/>} text="Suivez vos canditatures" />
            </Box>
      </Box>
    )
}

export default Header