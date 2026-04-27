import { Box, CardContent, Card, Divider, Typography, IconButton } from "@mui/material";
import { Chip } from "@mui/material";
import { useEffect } from "react";
import theme from "@/theme";
import { Company } from "@/interfaces/Company.interface";
import { formatDistanceToNowStrict } from 'date-fns';
import { fr } from 'date-fns/locale';
import MessageIcon from '@mui/icons-material/Message';
import BusinessIcon from '@mui/icons-material/Business';
import { useState } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Image from "next/image";

interface DashboardCompanyValidateProps {
    companiesToValidate: Company[];
}
const DashboardCompanyValidate = (props: DashboardCompanyValidateProps) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3;
    const maxStartIndex = Math.max(props.companiesToValidate.length - visibleCount, 0);
    const visibleCompanies = props.companiesToValidate.slice(startIndex, startIndex + visibleCount);

    useEffect(() => {
        console.log(startIndex, visibleCompanies);
    }, [startIndex]);
    return (
        <Box sx={{display:'flex', flexDirection:'column', gap: 1, marginTop: 4}}>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', gap: 2}}>
            <Divider 
                orientation="vertical" 
                variant="middle" 
                flexItem 
                sx={{ 
                    borderRightWidth: 3, 
                    borderColor: theme.palette.background.purple,
                    height: '39px',
                    opacity: 1 
                }} 
            />                
            <Typography>Entreprises à valider</Typography>
            <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                <IconButton
                    onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={startIndex === 0}
                    aria-label="company-previous"
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                    onClick={() => setStartIndex((prev) => Math.min(prev + 1, maxStartIndex))}
                    disabled={startIndex >= maxStartIndex}
                    aria-label="company-next"
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
            </Box>
            <Box sx={{display:'flex', flexDirection:'row', gap: 2, flexWrap:'nowrap', justifyContent:'space-between'}}>
                {visibleCompanies.map((company) => (
                    <CardCompanyValidate key={company.id} company={company} />
                ))}
            </Box>
        </Box>
    );
}
export default DashboardCompanyValidate;

interface CardCompanyValidateProps {
    company: Company;
}
const CardCompanyValidate = (props: CardCompanyValidateProps) => {
    const logoSrc =
        typeof props.company.logo === "string"
            ? props.company.logo
            : props.company.logo
                ? URL.createObjectURL(props.company.logo)
                : "";

    const shortDelayLabel = props.company.createdAt
        ? formatDistanceToNowStrict(new Date(props.company.createdAt), { locale: fr, addSuffix: true })
            .replace("ans", "a")
            .replace("an", "a")
            .replace("mois", "m")
            .replace("jours", "j")
            .replace("jour", "j")
            .replace(" heures", " h")
            .replace(" heure", " h")
            .replace(" minutes", " m")
            .replace(" minute", " m")
            .replace(" secondes", " s")
            .replace(" seconde", " s")
        : "En attente";

        const iconsColors = {
            backgroundColor: theme.palette.background.purple, 
            color: theme.palette.background.white, 
            borderRadius: '50px', 
            border:'2px solid'+theme.palette.background.purple, 
            ":hover": {
                backgroundColor: theme.palette.background.white, color: theme.palette.background.purple, border: '2px solid'+theme.palette.background.purple
            }
        }
    return (
        <Card sx={{
                position:'relative',
                width: '320px', 
                height: '350px', 
                borderRadius:'20px', 
                backgroundColor: theme.palette.background.white, 
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center', 
                alignItems:'center'
            }}>
            <Chip 
            sx={{
                backgroundColor: theme.palette.background.yellow, 
                color: theme.palette.background.white,
                position: 'absolute',
                top: '5px',
                right: '5px',
                borderRadius: '15px'
            }} 
            label={shortDelayLabel} 
            />                
            <CardContent sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                {props.company.logo ? (
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
                <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginBlock: 2}}>
                    <Typography sx={{fontSize: '20px', fontWeight: 'bold'}}>{props.company.name}</Typography>
                    <Typography sx={{fontSize: '16px'}}>{props.company.isSearch ? 'Actuellement en recherche' : 'ne recherche pas actuellement'}</Typography>
                    <Typography sx={{fontSize: '16px'}}>{props.company.sector} | {props.company.place?.map((place) => place.libelle).join(', ')}</Typography>
                    <Typography sx={{fontSize: '16px'}}>Environ {props.company.sizeCompany} employés</Typography>

                </Box>                
                <Box sx={{display:'flex', flexDirection:'row', gap: 1, justifyContent:'center', alignItems:'center'}}>
                    <IconButton sx={{
                        ...iconsColors
                    }}>                        
                        <BusinessIcon/>
                    </IconButton>
                    <IconButton sx={{
                        ...iconsColors
                    }}>
                        <MessageIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
}
