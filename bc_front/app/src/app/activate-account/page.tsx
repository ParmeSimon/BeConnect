'use client'

import theme from "@/theme";
import { Box, Button, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StickerLogo from "@/components/StickerLogo";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSnackbar } from "notistack";
import { verifyPassword } from "@/utils/security";
const ActivateAccountPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    const isForgotPassword = type === 'forgot_password';
    const [result, setResult] = useState<{ checked: boolean, size: boolean, upperCase: boolean, lowerCase: boolean, number: boolean, special: boolean, success: boolean, message: string }>({ checked: false, size: false, upperCase: false, lowerCase: false, number: false, special: false, success: false, message: '' });
    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);
    const [userInfo, setUserInfo] = useState<{ email: string; fullName: string } | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }


        fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/verify-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.valid) {
                    setValid(true);
                    setUserInfo({ email: data.email, fullName: data.fullName });
                }
            })
            .catch(() => setValid(false))
            .finally(() => setLoading(false));
    }, [token]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldType: 'password' | 'confirmPassword') => {
        const value = e.target.value;
        let currentPassword = password;
        let currentConfirm = confirmPassword;
    
        if (fieldType === 'password') {
            currentPassword = value;
            setPassword(value);
        } else {
            currentConfirm = value;
            setConfirmPassword(value);
        }
    
        // On passe les valeurs directes (pas l'état qui est en retard)
        const validation = verifyPassword(currentPassword, currentConfirm);
        setResult(validation); // Très important pour mettre à jour l'UI
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    
        if (!result.success) {
            enqueueSnackbar(result.message, { variant: 'error' });
            setSubmitting(false);
            return;
        }
        else{
            setSubmitting(true);
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/activate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (data.success) {
                enqueueSnackbar(isForgotPassword
                    ? 'Votre mot de passe a été réinitialisé avec succès ! Redirection vers la page de connexion...'
                    : 'Votre compte a été activé avec succès ! Redirection vers la page de connexion...', { variant: 'success' });
                setTimeout(() => router.push('/auth/login'), 3000);
            } else {
                enqueueSnackbar(data.message || 'Une erreur est survenue', { variant: 'error' });
            }
        } catch {
            enqueueSnackbar('Une erreur est survenue', { variant: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!token || !valid) {
        return (
            <Box sx={{
                display: 'flex', flexDirection: 'column', gap: 2,
                backgroundColor: theme.palette.background.white, borderRadius: '15px',
                justifyContent: 'center', alignItems: 'center',
                width: '50%', padding: '30px', marginInline: 'auto', marginTop: '50px',
            }}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Ce lien d&apos;activation est invalide ou a expiré.
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '60%', height: '100%', backgroundColor: theme.palette.background.purple, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '60%' }}>
                    <StickerLogo rotate={'-13deg'} width={500} height={200} responsive />
                </Box>
            </Box>
            <Box sx={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', pt: 6 }}>
                <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => { router.push('/') }}>
                    <ArrowBackIcon sx={{ color: theme.palette.background.purple }} />
                    <Typography variant="body1">Retour</Typography>
                </Box>
                <Typography variant="h3" sx={{ marginBottom: '20px' }}>
                    {isForgotPassword ? 'Réinitialiser votre mot de passe' : 'Créer votre mot de passe'}
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '80%' }}>
                    <TextField
                    label="Mot de passe"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'password')}
                    required
                    />
                    <TextField
                    label="Confirmer le mot de passe"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'confirmPassword')}
                    required
                    />
                    <Box>
                        <Typography  sx={{ color: result.checked ? 'green' : 'red' }}>
                            Mots de passe identiques
                        </Typography>
                        <Typography sx={{ color: result.size ? 'green' : 'red' }}>
                            8 caractères minimum
                        </Typography>
                        <Typography sx={{ color: result.upperCase ? 'green' : 'red' }}>
                            1 majuscule
                        </Typography>
                        <Typography sx={{ color: result.lowerCase ? 'green' : 'red' }}>
                            1 minuscule
                        </Typography>
                        <Typography sx={{ color: result.number ? 'green' : 'red' }}>
                            1 chiffre
                        </Typography>
                        <Typography sx={{ color: result.special ? 'green' : 'red' }}>
                            1 caractère spécial
                        </Typography>
                    </Box>
                    <Button type="submit" variant="contained" disabled={submitting} sx={{ color: theme.palette.background.white, backgroundColor: theme.palette.background.purple }}>
                        {submitting ? <CircularProgress size={24} /> : isForgotPassword ? 'Réinitialiser' : 'Activer mon compte'}
                    </Button>
                </Box>                
            </Box>
        </Box>
    );
};

export default ActivateAccountPage;
