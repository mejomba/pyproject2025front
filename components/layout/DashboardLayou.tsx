// components/DashboardLayout.tsx
'use client'

import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Paper,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
import QuizIcon from '@mui/icons-material/Quiz'
import { useState } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const sidebarWidth = 250

    return (
        <Box sx={{ position: 'relative', display: 'flex' }}>
            {/* سایدبار ثابت */}
            <Paper
                elevation={3}
                sx={{
                    width: sidebarWidth,
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    zIndex: 1300,
                    transform: open ? 'translateX(0)' : `translateX(${sidebarWidth}px)`,
                    transition: 'transform 0.3s ease-in-out',
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
                    <Typography variant="h6" mb={2}>
                        منوی اصلی
                    </Typography>
                    <List>
                        {[...Array(20)].map((_, i) => (
                            <ListItem button key={i}>
                                <ListItemIcon>
                                    {i % 3 === 0 ? <HomeIcon /> : i % 3 === 1 ? <SchoolIcon /> : <QuizIcon />}
                                </ListItemIcon>
                                <ListItemText primary={`آیتم ${i + 1}`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Paper>

            {/* دکمه فلش متصل به سایدبار */}
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    right: open ? sidebarWidth - 20 : 0,
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
                onClick={() => setOpen(!open)}
            >
                {open ? <ArrowForwardIosIcon fontSize="small" /> : <ArrowBackIosNewIcon fontSize="small" />}
            </Box>

            {/* محتوای اصلی که با سایدبار حرکت می‌کند */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: 'margin-right 0.3s ease-in-out',
                    marginRight: open ? `${sidebarWidth}px` : 0,
                    width: '100%',
                    p: 3,
                }}
            >
                {children}
            </Box>
        </Box>
    )
}