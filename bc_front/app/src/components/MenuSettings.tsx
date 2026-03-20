'use client'
import React from 'react'
import {
  Box,
  Collapse,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { NavItem, tablesRoutes } from '@/utils/navigation'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import InboxIcon from '@mui/icons-material/Inbox'
import StarBorder from '@mui/icons-material/StarBorder'
const drawerWidth = '15em'

const MenuSettings = ({ routes }: { routes: NavItem[] }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const pathName = usePathname() || ''
  const [open, setOpen] = React.useState(false)
  const menuItems = routes.filter(route => {
    if (!route.authorisedRoles) {
      return true
    }
    const intersectRoles = route.authorisedRoles?.filter(role =>
      session?.user.roles.includes(role)
    )

    return intersectRoles.length > 0
  })

  const menuTableItems = tablesRoutes.filter(route => {
    if (!route.authorisedRoles) {
      return true
    }
    const intersectRoles = route.authorisedRoles?.filter(role =>
      session?.user.roles.includes(role)
    )
    return intersectRoles.length > 0
  })

  const handleClick = () => {
    setOpen(!open)
  }



  if (pathName.startsWith('/settings')) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {session?.user &&
              menuItems
                .filter(item => !item.isHidden)
                .map(item => (
                  <ListItem key={item.path} sx={{ minWidth: '2.5em' }}>
                      <ListItemButton selected={pathName === item.path} onClick={() => router.push(item.path)}>
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                  </ListItem>
                ))}
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tableaux" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {session?.user &&
              menuTableItems
                .filter(item => !item.isHidden)
                .map(item => (
                  <ListItem key={item.path} sx={{ minWidth: '2.5em' }}>
                      <ListItemButton selected={pathName === item.path} onClick={() => router.push(item.path)}>
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                  </ListItem>
                ))}
                          </List>
                          </Collapse>
                          </List>
                          </Box>
                          </Drawer>
    )
  }
}

export default MenuSettings
