'use client'
import { Box, Button } from '@mui/material'
import { signOut } from 'next-auth/react'

export default function AdminPage() {
    return (
        <Box>
            <Button onClick={() => signOut()}> deconnexion</Button>
        </Box>
    )
}
