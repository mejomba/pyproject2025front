// app/dashboard/layout.tsx
'use client'

import {
    Box,
    Drawer,
    Typography,
    Toolbar,
    List,
    ListItem,
    ListItemText,
    CssBaseline,
    AppBar,
    IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

const drawerWidth = 240

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <Box sx={{ width: drawerWidth, p: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                منو داشبورد
            </Typography>
            <List>
                <ListItem button>
                    <ListItemText primary="خانه" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="دوره‌ها" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="آزمون‌ها" />
                </ListItem>
            </List>
        </Box>
    )

    return (
        <Box sx={{ display: 'flex', direction: 'rtl' }}>
            <CssBaseline />

            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        داشبورد آموزشی
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* سایدبار سمت راست */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                anchor="right"
            >
                {drawer}
            </Drawer>

            {/* محتوا سمت چپ */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: `${drawerWidth}px`, mt: 8 }}>
                <Box display="flex">
                    {/* منو عمودی سمت راست محتوای اصلی */}
                    <Box width={200} borderLeft={1} borderColor="divider" pr={2}>
                        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                            منوی داخلی
                        </Typography>
                        <List>
                            <ListItem button>
                                <ListItemText primary="نمای کلی" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="درس‌های من" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="تنظیمات" />
                            </ListItem>
                        </List>
                    </Box>

                    {/* محتوای اصلی وسط */}
                    <Box flexGrow={1} pl={3}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
