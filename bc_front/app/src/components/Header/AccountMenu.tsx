import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MessageIcon from '@mui/icons-material/Message';
export default function AccountMenu() {
    const session = useSession();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleSettings = () => {
        router.push('/settings/notifications');
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 45, height: 45 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 45,
                                height: 45,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> {session.data?.user?.fullName}
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <MessageIcon fontSize="small" />
                    </ListItemIcon>
                    messagerie
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <NotificationsIcon fontSize="small" />
                    </ListItemIcon>
                    Notifications
                </MenuItem>
                <MenuItem onClick={() => handleSettings()}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    paramètres
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Se déconnecter
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
