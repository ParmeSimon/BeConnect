import { Box, CardContent, Card, Divider, Typography, IconButton } from "@mui/material";
import { Chip } from "@mui/material";
import theme from "@/theme";
import { Offer } from "@/interfaces/Offer.interface";
import { formatDistanceToNowStrict } from 'date-fns';
import { fr } from 'date-fns/locale';
import MessageIcon from '@mui/icons-material/Message';
import Image from "next/image";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BusinessIcon from '@mui/icons-material/Business';
import { useState } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
interface DashboardOfferValidateProps {
    offersToValidate: Offer[];
}
const DashboardOfferValidate = (props: DashboardOfferValidateProps) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3;
    const maxStartIndex = Math.max(props.offersToValidate.length - visibleCount, 0);
    const visibleOffers = props.offersToValidate.slice(startIndex, startIndex + visibleCount);

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
            <Typography>Offres à valider</Typography>
            <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                <IconButton
                    onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={startIndex === 0}
                    aria-label="Voir les offres precedentes"
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                    onClick={() => setStartIndex((prev) => Math.min(prev + 1, maxStartIndex))}
                    disabled={startIndex >= maxStartIndex}
                    aria-label="Voir les offres suivantes"
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
            </Box>
            <Box sx={{display:'flex', flexDirection:'row', gap: 2, flexWrap:'nowrap', justifyContent:'space-between'}}>
                {visibleOffers.map((offer) => (
                    <CardOfferValidate key={offer.id} offer={offer} />
                ))}
            </Box>
        </Box>
    );
}
export default DashboardOfferValidate;

interface CardOfferValidateProps {
    offer: Offer;
}
const CardOfferValidate = (props: CardOfferValidateProps) => {
    const logoSrc =
        typeof props.offer.company.logo === "string"
            ? props.offer.company.logo
            : props.offer.company.logo
                ? URL.createObjectURL(props.offer.company.logo)
                : "";

    const shortDelayLabel = props.offer.createdAt
        ? formatDistanceToNowStrict(new Date(props.offer.createdAt), { locale: fr, addSuffix: true })
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
            {props.offer.company.logo ? (
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
                    <Typography sx={{fontSize: '20px', fontWeight: 'bold'}}>{props.offer.title}</Typography>
                    <Typography sx={{fontSize: '20px', fontWeight: '400'}}>{props.offer.company.name}</Typography>
                    <Typography sx={{fontSize: '16px'}}>{props.offer.contract} | {props.offer.place?.map((place) => place.libelle).join(', ')}</Typography>
                    <Typography sx={{fontSize: '16px'}}>{props.offer.description}</Typography>
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
                        <LocalOfferIcon />
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
