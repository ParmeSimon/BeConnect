'use client'
import { useState } from 'react'
import theme from '@/theme'
import { Box, TextField, Button, Typography, Link, Alert } from '@mui/material'
import { Theme } from '@mui/material/styles'
import StickerLogo from '@/components/StickerLogo'
import { FormControlLabel, Checkbox } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        const res = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false, // On gère la redirection manuellement
        });
    
        if (res?.error) {
            setError('Identifiants incorrects ou erreur serveur');
        } else {
            setSuccess('Connexion réussie !');
            window.location.href = '/';
        }
    }

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
                <Typography variant="h3" sx={{marginBottom: '20px'}}>Connexion</Typography>
                {error && <Alert severity="error" sx={{ width: '80%', mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '80%' }}>
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <FormControlLabel control={<Checkbox />} label="Se souvenir de moi" />
                        <Link href="/auth/forgot-password" onClick={() => {router.push('/auth/forgot-password')}}>Mot de passe oublié ?</Link>
                    </Box>

                    <Button type="submit" variant="contained" sx={{color: (theme as Theme).palette.background.white, backgroundColor: (theme as Theme).palette.background.purple}}>Connexion</Button>
                </Box>
                <Link href="/auth/register" sx={{marginTop: '20px'}} onClick={() => {router.push('/auth/register')}}>Créer son compte entreprise</Link>
            </Box>
        </Box>
    )
}