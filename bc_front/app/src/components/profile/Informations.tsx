import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Box, Link, Typography } from "@mui/material";
import { User } from "@/interfaces/User.interface";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ModalEditProfil from "./ModalEditProfil";
import WebIcon from '@mui/icons-material/Web';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
interface InformationsProps {
    user: User;
    setUser: (user: User) => void;
    role: "administrator" | "student" | "company";
}

const Informations = ({ user, setUser: setUser, role }: InformationsProps) => {

    const [openModalEditProfil, setOpenModalEditProfil] = useState(false);

    const [logoSrc, setLogoSrc] = useState<string>("");
    const profile = user[role as keyof User] as
        | { logo?: unknown; name?: string; place?: Array<{ libelle?: string } | string>; description?: string; website?: string; instagram?: string; Linkedin?: string; linkedin?: string }
        | undefined;
    const placeLabel = Array.isArray(profile?.place)
        ? profile.place
              .map((p) => (typeof p === "string" ? p : p?.libelle))
              .filter(Boolean)
              .join(", ")
        : "";

    useEffect(() => {
        const logo = profile?.logo;
        if (!logo || typeof logo !== "string") {
            setLogoSrc("");
            return;
        }

        setLogoSrc(logo);
    }, [profile?.logo]);

    const handleEditProfil = useCallback(() => {
        setOpenModalEditProfil(true);
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: { xs: "92%", md: "70%", xl: "70%" },
                    minHeight: "180px",
                    backgroundColor: "white",
                    marginInline: "auto",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 3,
                    gap: 3,
                    position: "relative",
                }}
            >
                <Box sx={{ position: "absolute", top: 10, right: 12 }}>
                    <IconButton onClick={handleEditProfil}>
                        <EditIcon />
                    </IconButton>
                </Box>
                {logoSrc ? (
                    <Image src={logoSrc} alt="logo" width={100} height={100} style={{ width: "110px", height: "110px", objectFit: "cover", borderRadius: "12px", flexShrink: 0 }} unoptimized />
                ) : (
                    <Box
                        sx={{
                            width: "110px",
                            height: "110px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f2f2f2",
                            color: "#8a8a8a",
                            fontWeight: 600,
                            flexShrink: 0,
                        }}
                    >
                        LOGO
                    </Box>
                )}
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, gap: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", pr: 4 }}>{profile?.name}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>{placeLabel}</Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {profile?.description}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "end", gap: 0.5, ml: "auto", alignSelf: "flex-end", pb: 0.5 }}>
                    <Link href={profile?.website || "#"}>
                        <IconButton>
                            <WebIcon />
                        </IconButton>
                    </Link>
                    <Link href={profile?.instagram || "#"}>
                        <IconButton>
                            <InstagramIcon />
                        </IconButton>
                    </Link>
                    <Link href={profile?.linkedin || profile?.Linkedin || "#"}>
                        <IconButton>
                            <LinkedInIcon />
                        </IconButton>
                    </Link>
                </Box>
            </Box>
            <ModalEditProfil open={openModalEditProfil} onClose={() => setOpenModalEditProfil(false)} user={user} setUser={setUser} type={role} />
        </>
    );
};

export default Informations;