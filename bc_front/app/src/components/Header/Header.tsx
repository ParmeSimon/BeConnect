'use client'
import theme from "@/theme"
import { Box } from "@mui/material"
import Image from "next/image"
import { useSession } from "next-auth/react"
import ButtonHeader from "./Button"
import AccountMenu from "./AccountMenu"
import { isAdmin, isStudent, isCompany } from "@/utils/navigation"
const Header = () => {
  const { data: session } = useSession()
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
      height: '70px',
      borderRadius: '56px',
      marginInline: '10%',
      marginTop: '30px',
      gap: '50px',
      zIndex: 1000,
    }}>
      <Box>
        <Image src="/logoBig.png" alt="logo" width={100} height={100} style={{ width: '100%', height: '100%', minWidth: '148px', minHeight: '50px' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        {isRole === "ROLE_ADMIN" ?
          isAdmin.map((item) =>
            <ButtonHeader label={item.label} link={item.link} key={item.label} />)
          :
          isRole === "ROLE_USER" ?
            isStudent.map((item) =>
              <ButtonHeader label={item.label} link={item.link} key={item.label} />
            ) : isRole === "ROLE_COMPANY" ?
              isCompany.map((item) =>
                <ButtonHeader label={item.label} link={item.link} key={item.label} />
              ) : <></>
        }
      </Box>
      <Box>
        <AccountMenu />
      </Box>
    </Box>
  )
}

export default Header
