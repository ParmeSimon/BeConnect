import theme from "@/theme";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface ButtonHeaderProps {
    label: string;
    link: string;
}

export default function ButtonHeader({ label, link }: ButtonHeaderProps) {
    const router = useRouter();
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
        }}
            onClick={() => {
                if (link) {
                    router.push(link);
                }
            }}
        >
            <Typography>{label}</Typography>
        </Button>
    )
}