'use client'
import { useState } from 'react'
import theme from '@/theme'
import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import StickerLogo from '@/components/StickerLogo'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useSnackbar } from 'notistack'
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                frontUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
            }),
        })
        enqueueSnackbar('Si cette adresse est associée à un compte, un email de réinitialisation a été envoyé.', { variant: 'success' })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '60%', height: '100%', backgroundColor: theme.palette.background.purple, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{ width: '60%' }}>
                    <StickerLogo rotate={'-13deg'} width={500} height={200} responsive />
                </Box>
            </Box>
            <Box sx={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', pt: 6 }}>
                <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => {router.back()}}>
                    <ArrowBackIcon sx={{color: theme.palette.background.purple}} />
                    <Typography variant="body1">Retour</Typography>
                </Box>
                <Typography variant="h3" sx={{marginBottom: '20px'}}>Mot de passe oublié</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '80%', textAlign: 'center'}}>
                    <Typography variant="body1">
                        Veuillez saisir l&apos;adresse mail liée à votre compte pour recevoir le mail de réinitialisation.
                    </Typography>
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Button type="submit" variant="contained" sx={{color: theme.palette.background.white, backgroundColor: theme.palette.background.purple}}>Envoyer</Button>
                </Box>
            </Box>
        </Box>
    )
}
