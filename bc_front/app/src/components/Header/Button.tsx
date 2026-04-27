import theme from "@/theme";
import { Button, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

interface ButtonHeaderProps {
    label: string;
    link: string;
}

export default function ButtonHeader({ label, link }: ButtonHeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";
    const isCurrentPage = normalizePath(pathname) === normalizePath(link);

    return (
        <Button sx={{
            backgroundColor: isCurrentPage ? theme.palette.background.purple : theme.palette.background.white,
            color: isCurrentPage ? theme.palette.background.white : theme.palette.background.black,
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