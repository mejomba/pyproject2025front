// components/layout/Sidebar.tsx
'use client'

import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, IconButton, useMediaQuery, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Props {
    open: boolean
    onToggle: () => void
    width: number
}

export default function Sidebar({ open, onToggle, width }: Props) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    width: width,
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    zIndex: 1300,
                    transform: open ? 'translateX(0)' : `translateX(${width}px)`,
                    transition: 'transform 0.3s ease-in-out',
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    pt: 2,
                }}
            >
                <List>
                    <ListItem button>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="خانه" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="تنظیمات" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="خروج" />
                    </ListItem>
                </List>
            </Paper>

            {/* Toggle Button */}
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    right: open ? width - 20 : 0,
                    transform: 'translateY(-50%)',
                    zIndex: 1400,
                    width: 40,
                    height: 40,
                    borderRadius: '0 4px 4px 0',
                    bgcolor: 'primary.main',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'right 0.3s ease-in-out',
                }}
                onClick={onToggle}
            >
                {open ? <ArrowForwardIosIcon fontSize="small" /> : <ArrowBackIosNewIcon fontSize="small" />}
            </Box>
        </>
    )
}
