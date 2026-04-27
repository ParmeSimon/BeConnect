import theme from "@/theme"
import { Box, Typography } from "@mui/material"

interface SquareProps {
    title: string
    description: string
}

const Square = (props: SquareProps) => {
    return (
        <Box sx={{
            position:'relative', 
            width: '50%', 
            height: '250px', 
            borderRadius: '10px', display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            border : `4px solid ${theme.palette.background.purple}`,
        }}>
            <Typography variant="h6" sx={{color: theme.palette.background.purple, position:'absolute', top:'10px', fontWeight:'bold' }}>{props.title}</Typography>
            <Typography variant="h5" sx={{color: theme.palette.background.purple}}>{props.description}</Typography>
        </Box>

    )
}
export default Square