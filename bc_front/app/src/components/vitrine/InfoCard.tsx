import theme from "@/theme"
import { Box, Typography } from "@mui/material"
import Image from "next/image"

interface InfoCardProps {
    icon: React.ReactNode
    text: string
}

const InfoCard = (props: InfoCardProps) => {

    return (
        <Box sx={{ 
            minWidth : '25%',
            width : '25%', 
            height: '150px', 
            backgroundColor: theme.palette.background.white, 
            borderRadius: '10px', 
            display: 'flex', 
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            flexDirection : 'column',
            justifyContent : 'center',
            alignItems : 'center',
            textAlign : 'center',
            gap : 2
            }}>
            {props.icon}
            <Typography variant="h6">{props.text}</Typography>
        </Box>
    )
}

export default InfoCard