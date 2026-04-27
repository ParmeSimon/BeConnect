'use client'
import { useState } from 'react'
import theme from '@/theme'
import { Box, TextField, Button, Typography, Link, Alert } from '@mui/material'
import { Theme } from '@mui/material/styles'
import StickerLogo from '@/components/StickerLogo'
import { FormControlLabel, Checkbox } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [siret, setSiret] = useState('')
    const router = useRouter()

    const checkSiretValidity = async () => {
        if (siret.length !== 14) {
            enqueueSnackbar('Le siret doit contenir 14 caractères', { variant: 'error' })
            return false
        }
        if (!/^[0-9]+$/.test(siret)) {
            enqueueSnackbar('Le siret doit contenir uniquement des chiffres', { variant: 'error' })
            return false
        }    
        
        const response = await fetch(`/api/sirene/${siret}`, {
            method: 'GET',
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log("Entreprise trouvée :", data.etablissement.uniteLegale.denominationUniteLegale);
            return data.etablissement.uniteLegale.denominationUniteLegale;
        } else if (response.status === 404) {
            console.error("SIRET inconnu");
            return false;
        } else {
            console.error("Erreur API :", response.status);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const companyName = await checkSiretValidity();
        console.log(companyName);

    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '60%', height: '100%', backgroundColor: (theme as Theme).palette.background.purple, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '60%' }}>
                    <StickerLogo rotate={'-13deg'} width={500} height={200} responsive />
                </Box>
            </Box>
            <Box sx={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', pt: 6 }}>
                <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => { router.push('/') }}>
                    <ArrowBackIcon sx={{ color: (theme as Theme).palette.background.purple }} />
                    <Typography variant="body1">Retour</Typography>
                </Box>
                <Typography variant="h3" sx={{ marginBottom: '20px' }}>Créer un compte</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '80%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <TextField label="Siret" type="text" value={siret} onChange={(e) => setSiret(e.target.value)} required />
                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '80%' }}>
                        <TextField label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <TextField label="Confirmer " type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </Box>
                    <TextField label="Nom et Prénom" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    <FormControlLabel control={<Checkbox />} label="J'accepte les Conditions Générales d'Utilisation et la Politique de Confidentialité" />
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    </Box>
                    <Button type="submit" variant="contained" sx={{ color: (theme as Theme).palette.background.white, backgroundColor: (theme as Theme).palette.background.purple }}>Créer un compte</Button>
                </Box>
                <Link href="/auth/login" sx={{ marginTop: '20px' }} onClick={() => { router.push('/auth/login') }}>Déjà un compte ? Connectez-vous</Link>
            </Box>
        </Box>
    )
}