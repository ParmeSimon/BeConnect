'use client'
import theme from "@/theme"
import { Box, IconButton } from "@mui/material"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import ButtonHeader from "./Button"
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation"

const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const isAdmin = ["Dashboard", "Offres", "Étudiants", "Alumnis", "Entreprises"]
  const isStudent = ["Profil", "Offres", "Étudiants", "Ancien étudiants", "Entreprises", "Suivi"]
  const isCompany = ["Profil", "Offres", "Étudiants", "Candidatures"]

  const isRole = session?.user?.roles[0]

  if (!session) return null

  return (
    <Box sx={{
      backgroundColor: theme.palette.background.white,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      width: '80%',
      position: 'fixed',
      height: '80px',
      borderRadius: '56px',
      marginInline: '10%',
      marginTop: '30px',
      gap: '50px'
    }}>
      <Box>
        <Image src="/logoBig.png" alt="logo" width={100} height={100} style={{ width: '100%', height: '100%' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {isRole === "ROLE_ADMIN" ? isAdmin.map((item) => <ButtonHeader key={item} label={item} />) : isRole === "ROLE_USER" ? isStudent.map((item) => <ButtonHeader key={item} label={item} />) : isRole === "ROLE_COMPANY" ? isCompany.map((item) => <ButtonHeader key={item} label={item} />) : <></>}
      </Box>
      <Box>
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon onClick={() => router.push('/settings/notifications')} />
        </IconButton>
        <IconButton onClick={() => signOut()}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Header
