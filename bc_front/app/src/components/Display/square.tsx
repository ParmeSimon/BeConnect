import theme from "@/theme"
import { Box, Typography } from "@mui/material"

interface SquareProps {
    title: string
    description: string
}

const Square = (props: SquareProps) => {
    return (
        <Box sx={{ width: '40%', height: '250px', backgroundColor: theme.palette.background.white, borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border : `2px solid ${theme.palette.background.purple}` }}>
            <Typography variant="h6" sx={{color: theme.palette.background.purple}}>{props.title}</Typography>
            <Typography variant="h4" sx={{color: theme.palette.background.purple}}>{props.description}</Typography>
        </Box>

    )
}
export default Square