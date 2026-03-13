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

  const isAdmin = [{label: "Dashboard", link: "/admin/dashboard"}, {label: "Offres", link: "/admin/offers"}, {label: "Étudiants", link: "/admin/students"}, {label: "Alumnis", link: "/admin/alumnis"}, {label: "Entreprises", link: "/admin/companies"}]
  const isStudent = [{label: "Profil", link: "/student/profile"}, {label: "Offres", link: "/student/offers"}, {label: "Étudiants", link: "/student/students"}, {label: "Ancien étudiants", link: "/student/alumnis"}, {label: "Entreprises", link: "/student/companies"}, {label: "Suivi", link: "/student/tracking"}]
  const isCompany = [{label: "Profil", link: "/company/profile"}, {label: "Offres", link: "/company/offers"}, {label: "Étudiants", link: "/company/students"}, {label: "Candidatures", link: "/company/applications"}]

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
        {isRole === "ROLE_ADMIN" ? isAdmin.map((item) => <ButtonHeader label={item.label} link={item.link} />) : isRole === "ROLE_USER" ? isStudent.map((item) => <ButtonHeader label={item.label} link={item.link} />) : isRole === "ROLE_COMPANY" ? isCompany.map((item) => <ButtonHeader label={item.label} link={item.link} />) : <></>}
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
