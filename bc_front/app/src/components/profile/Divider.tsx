'use client'
import {Box, Typography} from "@mui/material";
import theme from '@/theme'
import { User } from "@/interfaces/User.interface";

interface DividerProps{
    user: User;
    role: "administrator" | "student" | "company"
}

const Divider = (props: DividerProps) =>{
    console.log(props.user);
    return (
        <Box sx={{marginBlock: '40px',width:'100%', minHeight:'70px', height:'120px', backgroundColor: theme.palette.background.purple,color: theme.palette.background.white, display:'flex', justifyContent:'center', alignItems:'center'}}>
            {props.role === "administrator" && <Typography sx={{fontSize:'48px', fontWeight:'bold' }}>{props.user.administrator?.slogan}</Typography>}
        </Box>
    );
}

export default Divider