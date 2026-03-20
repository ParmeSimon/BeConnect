'use client'

import theme from "@/theme";
import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { verifyPassword } from "@/utils/security";
import { useSession } from "next-auth/react";
import { useFetcher } from "@/hooks/useFetcher";
import User from "@/interfaces/User";

const ChangePasswordPage = () => {
    const { data: session } = useSession();
    const { apiFetch } = useFetcher();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [result, setResult] = useState<{ checked: boolean, size: boolean, upperCase: boolean, lowerCase: boolean, number: boolean, special: boolean, success: boolean, message: string }>({ checked: false, size: false, upperCase: false, lowerCase: false, number: false, special: false, success: false, message: '' });
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [userInfo, setUserInfo] = useState<{ email: string; fullName: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldType: 'password' | 'confirmPassword') => {
        const value = e.target.value;
        let currentPassword = newPassword;
        let currentConfirm = confirmNewPassword;
    
        if (fieldType === 'password') {
            currentPassword = value;
            setNewPassword(value);
        } else {
            currentConfirm = value;
            setConfirmNewPassword(value);
        }
    
        const validation = verifyPassword(currentPassword, currentConfirm);
        setResult(validation); 
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setResult(verifyPassword(newPassword, confirmNewPassword));

        setSubmitting(false);
    }

    useEffect( () => {
        const fetchUser = async () => {
            const user = await apiFetch('/api/users?email=' + session?.user.email)
            const userData = await user.json();
            setUser(userData.member[0]);
        }
        fetchUser();
    }, [session]);

    useEffect(() => {


}, [user]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '80vh'}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    backgroundColor: theme.palette.background.white,
                    borderRadius: '15px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60%',
                    padding: '50px',
                    marginInline: 'auto',
                    marginTop: '30px',
                }}
                component="form"
                onSubmit={onSubmit}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width:'50%'}}>
                    <Typography variant="h5">Changer de mot de passe</Typography>
                    <TextField type="password" label="Mot de passe actuel" variant="outlined" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} sx={{marginBottom: '30px'}}/>
                    <TextField type="password" label="Nouveau mot de passe" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'password')} value={newPassword} />
                    <TextField type="password" label="Confirmer le nouveau mot de passe" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'confirmPassword')} value={confirmNewPassword} />
                    <Button type="submit" variant="contained" sx={{color: theme.palette.background.white, backgroundColor: theme.palette.background.purple }}>Modifier</Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{display: 'flex', flexDirection: 'column', width:'50%'}}>
                    <Grid container spacing={2} sx={{textAlign: 'center',marginTop:'20px'}}>
                        <Grid size={12}>
                            <Typography variant="body1" sx={{textAlign: 'start'}}>adresse email : {user?.email}</Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body1" sx={{textAlign: 'start'}}>
                                Derniere Modification : {
                                user?.updatedAt
                                    ? new Date(user.updatedAt).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })
                                    : 'Non disponible'}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                        <Divider />
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="body1" sx={{ color: result.checked ? 'green' : 'red' }}>Mots de passe identiques</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="body1" sx={{ color: result.size ? 'green' : 'red' }}>8 caractères minimum</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="body1" sx={{ color: result.upperCase ? 'green' : 'red' }}>1 majuscule</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="body1" sx={{ color: result.lowerCase ? 'green' : 'red' }}>1 minuscule</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="body1" sx={{ color: result.number ? 'green' : 'red' }}>1 chiffre</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="body1" sx={{ color: result.special ? 'green' : 'red' }}>1 caractère spécial</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" sx={{textAlign: 'center',border: '2px solid',paddingBlock:'5px', width:'100%', borderColor: result.success ? 'green' : 'red', padding: '10px', borderRadius: '5px'}}>{result.success ? 'Mot de passe valide' : 'Mot de passe invalide'}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ChangePasswordPage;
