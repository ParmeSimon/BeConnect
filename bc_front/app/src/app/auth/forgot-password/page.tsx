'use client'
import { useState } from 'react'
import theme from '@/theme'
import { Box, TextField, Button, Typography, Link, Alert } from '@mui/material'
import { Theme } from '@mui/material/styles'
import StickerLogo from '@/components/StickerLogo'
import { FormControlLabel, Checkbox } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const router = useRouter()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '60%', height: '100%', backgroundColor: (theme as Theme).palette.background.purple, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{ width: '60%' }}>
                    <StickerLogo rotate={'-13deg'} width={500} height={200} responsive />
                </Box>
            </Box>
            <Box sx={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', pt: 6 }}>
                <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => {router.back()}}>
                    <ArrowBackIcon sx={{color: (theme as Theme).palette.background.purple}} />
                    <Typography variant="body1">Retour</Typography>
                </Box>
                <Typography variant="h3" sx={{marginBottom: '20px'}}>Mot de passe oublié</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '80%', textAlign: 'center'}}>
                    <Typography variant="body1">
                        Veuillez saisir l’adresse mail lié a votre compte. Verifié que l’adresse mail renseigné est connue pour recevoir le mail de reinitialisation.
                    </Typography>
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button type="submit" variant="contained" sx={{color: (theme as Theme).palette.background.white, backgroundColor: (theme as Theme).palette.background.purple}}>Envoyer</Button>
                </Box>
            </Box>
        </Box>
    )
}