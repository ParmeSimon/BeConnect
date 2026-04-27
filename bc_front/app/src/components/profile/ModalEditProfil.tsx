import theme from "@/theme";
import { Modal, Box, Button, TextField } from "@mui/material";
import { User } from "@/interfaces/User.interface";
import { useState, useEffect } from "react";
import { useFetcher } from "@/hooks/useFetcher";
import { useSnackbar } from "notistack";
import { HttpStatusCode } from "@/utils/security";

interface ModalEditProfilProps {
    open: boolean;
    onClose: () => void;
    user: User;
    setUser: (user: User) => void;
    type: "administrator" | "student" | "company";
}

const ModalEditProfil = ({ open, onClose, user, setUser, type }: ModalEditProfilProps) => {
    const { apiFetch } = useFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const currentProfile = user[type as keyof User] as
        | { id?: number; name?: string; instagram?: string; website?: string; linkedin?: string; description?: string; logo?: Blob }
        | undefined;
    const [formData, setFormData] = useState<{
        name?: string;
        description?: string;
        instagram?: string;
        website?: string;
        linkedin?: string;
        logo?: string;
    }>({});

    useEffect(() => {
        if (!open) return;
        setFormData({
            name: currentProfile?.name ?? "",
            instagram: currentProfile?.instagram ?? "",
            website: currentProfile?.website ?? "",
            linkedin: currentProfile?.linkedin ?? "",
            description: currentProfile?.description ?? "",
            logo: "",
        });
    }, [open, currentProfile?.id]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === "administrator") {
            if (!currentProfile?.id) {
                enqueueSnackbar("Profil administrateur introuvable", { variant: "error" });
                return;
            }
            const payload: Record<string, string> = {
                name: formData.name ?? "",
                instagram: formData.instagram ?? "",
                website: formData.website ?? "",
                linkedin: formData.linkedin ?? "",
                description: formData.description ?? "",
                logo: formData.logo ?? "",
            };
            const response = await apiFetch('/api/administrators/' + currentProfile.id, 'PATCH', payload);
            let responseData: any = null;
            try {
                responseData = await response.clone().json();
            } catch {
                responseData = null;
            }
            if (response.status === HttpStatusCode.OK) {
                setUser({
                    ...user,
                    [type]: {
                        ...user[type],
                        name: formData.name ?? user[type]?.name,
                        instagram: formData.instagram ?? user[type]?.instagram,
                        website: formData.website ?? user[type]?.website,
                        linkedin: formData.linkedin ?? user[type]?.linkedin,
                        description: formData.description ?? user[type]?.description,
                    },
                });
                enqueueSnackbar('Administrateur modifié avec succès', { variant: 'success' });
                onClose();
            } else {
                const message =
                    responseData?.description ||
                    responseData?.detail ||
                    responseData?.message ||
                    "Erreur lors de la modification de l'administrateur";
                enqueueSnackbar(message, { variant: "error" });
            }
        }
    }
    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box component="form" onSubmit={onSubmit} sx={{gap: 2, width: '50%', height: '80%', backgroundColor: 'white', borderRadius: 2, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {
                    type === "administrator" && (
                        <>
                            <TextField type="text" label="Nom école" variant="outlined" value={formData.name ?? ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
                            <TextField type="text" label="Instagram" variant="outlined" value={formData.instagram ?? ""} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}/>
                            <TextField type="text" label="Site Web" variant="outlined" value={formData.website ?? ""} onChange={(e) => setFormData({ ...formData, website: e.target.value })}/>
                            <TextField type="text" label="Linkedin" variant="outlined" value={formData.linkedin ?? ""} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}/>
                            <TextField type="text" label="Description" variant="outlined" value={formData.description ?? ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
                            <TextField
                                type="file"
                                variant="outlined"
                                slotProps={{ inputLabel: { shrink: true } }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const file = e.target.files?.[0];
                                    if (!file) {
                                        setFormData({ ...formData, logo: "" });
                                        return;
                                    }
                                    setFormData({ ...formData, logo: file.name });
                                }}
                            />
                        </>
                    )
                }
                
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}>
                    <Button onClick={onClose} sx={{ width: '50%', backgroundColor: theme.palette.background.yellow, color: theme.palette.background.black}}>Annuler</Button>
                    <Button type="submit" sx={{ width: '50%', backgroundColor: theme.palette.background.purple, color: theme.palette.background.white}}>Modifier le profil</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalEditProfil;
