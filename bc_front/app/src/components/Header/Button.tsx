import theme from "@/theme";
import { Button, Typography } from "@mui/material";

export default function ButtonHeader({ label }: { label: string }) {
    return (
        <Button sx={{
            backgroundColor: theme.palette.background.white,
            color: theme.palette.background.black,
            border: `2px solid ${theme.palette.background.purple}`,
            borderRadius: '16px',
            paddingInline: '20px',
            paddingBlock: '1px',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: theme.palette.background.purple,
                color: theme.palette.background.white,
                border: `2px solid ${theme.palette.background.purple}`,
            },
            '&:active': {
                backgroundColor: theme.palette.background.purple,
                color: theme.palette.background.white,
                border: `2px solid ${theme.palette.background.purple}`,
            },
        }}>
            <Typography>{label}</Typography>
        </Button>
    )
}