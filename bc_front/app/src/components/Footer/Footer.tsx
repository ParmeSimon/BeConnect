'use client'
import theme from '@/theme';
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { isAdmin, isStudent, isCompany } from "@/utils/navigation"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const Footer = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const isRole = session?.user?.roles[0]
    if (!session) return null

    return (
        <Box sx={{ zIndex: 1000, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, width: '100%', maxWidth: 1100, px: 3, py:3 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Image src="/logoBig.png" alt="logo" width={100} height={100} style={{ width: '60%', height: '100%', minWidth: '148px', minHeight: '50px' }} />
                    <Typography sx={{ color: theme.palette.background.black, fontSize: '14px', maxWidth: 320 }}>Une plateforme faite par les étudiants, pour les étudiants — et leurs futurs employeurs. L’entraide commence ici.</Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Typography sx={{ color: theme.palette.background.black, fontSize: '14px', fontWeight: 'bold' }}>Menu</Typography>
                    {isRole === "ROLE_ADMIN" ?
                        isAdmin.map((item) =>
                            <Typography key={item.label} sx={{cursor:'pointer'}} onClick={() => {router.push(item.link)}}>{item.label}</Typography>
                        ) : isRole === "ROLE_USER" ?
                            isStudent.map((item) =>
                                <Typography key={item.label} sx={{cursor:'pointer'}} onClick={() => {router.push(item.link)}}>{item.label}</Typography>
                            ) : isRole === "ROLE_COMPANY" ?
                                isCompany.map((item) =>
                                    <Typography key={item.label} sx={{cursor:'pointer'}} onClick={() => {router.push(item.link)}}>{item.label}</Typography>
                                ) : <></>
                    }
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Typography sx={{ color: theme.palette.background.black, fontSize: '14px', fontWeight: 'bold' }}>Informations</Typography>
                    <Typography sx={{ color: theme.palette.background.black, fontSize: '14px' }}>Mentions légales</Typography>
                    <Typography sx={{ color: theme.palette.background.black, fontSize: '14px' }}>Politique de confidentialité</Typography>
                    <Typography sx={{ color: theme.palette.background.black, fontSize: '14px' }}>Conditions d'utilisation</Typography>
                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.palette.background.purple, paddingBlock: 1, width:'100%'}}>
                <Typography sx={{color: theme.palette.background.white, fontSize: '14px'}}>© 2026 TOUS DROIS RÉSERVÉS | CodeBuster </Typography>
            </Box>
        </Box>
    );
}
export default Footer;