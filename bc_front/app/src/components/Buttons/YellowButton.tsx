import { Button } from "@mui/material"
import theme from "@/theme"

interface YellowButtonProps {
    label: string
    onClick: () => void
    fill: boolean
    maxWidth: string
}

const YellowButton = (props: YellowButtonProps) => {
    return (
        <Button 
        sx={{ 
            minWidth: '15%', 
            color: props.fill? theme.palette.background.black : theme.palette.background.yellow,
            backgroundColor: props.fill ? theme.palette.background.yellow : 'transparent',
            padding : "2px 30px", 
            border: `3px solid ${theme.palette.background.yellow}`, 
            borderRadius:"10px",
            maxWidth: props.maxWidth 
        }} 
        variant="contained" 
        color="primary" 
        onClick={props.onClick}>
            {props.label}
        </Button>
    )
}

export default YellowButton