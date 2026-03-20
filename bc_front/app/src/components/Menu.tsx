'use client'

import { NavItem, routes } from "@/utils/navigation"
import { Box, Link } from "@mui/material"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

const Menu = ({ routes }: { routes: NavItem[] }) => {
    const { data: session } = useSession()
    const pathname = usePathname() || ''
    const menuItems = routes.filter(route => {
        if (!route.authorisedRoles) {
            return true
        }
        const intersectRoles = route.authorisedRoles.filter(role => session?.user?.roles.includes(role))

        return intersectRoles.length > 0

    })

    if (pathname.startsWith('/settings')) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {menuItems.map((item) => (
                    <Box key={item.path}>
                        <Link href={item.path}>
                            {item.label}
                        </Link>
                    </Box>
                ))}
            </Box>
        )
    }
}

export default Menu