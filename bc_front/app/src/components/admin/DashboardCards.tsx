import { Box, Typography } from "@mui/material";
import theme from "@/theme";


interface DashboardCardsProps {
    numbers: number;
    title: string;
}

const DashboardCards = (props: DashboardCardsProps) => {
    return (
        <Box sx={{width:'230px', height:'160px', borderRadius:'16px', backgroundColor:theme.palette.background.white, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Typography sx={{fontSize:'48px', fontWeight:'bold', color:theme.palette.background.purple}}>{props.numbers}</Typography>
            <Typography>{props.title}</Typography>
        </Box>
    );
}
export default DashboardCards;