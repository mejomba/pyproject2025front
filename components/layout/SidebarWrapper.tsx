// components/layout/SidebarWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useMediaQuery, useTheme, Box } from '@mui/material'
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react'

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isDashboard = pathname.startsWith('/dashboard')

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [open, setOpen] = useState(!isMobile)

    useEffect(() => {
        setOpen(!isMobile)
    }, [isMobile])

    const sidebarWidth = 240

    return (
        <Box sx={{ display: 'flex', transition: 'all 0.3s ease-in-out' }}>
            {isDashboard && (
                <Sidebar
                    open={open}
                    onToggle={() => setOpen(!open)}
                    width={sidebarWidth}
                />
            )}

            <Box
                sx={{
                    flexGrow: 1,
                    transition: 'margin-right 0.3s ease-in-out',
                    marginRight: isDashboard && open ? `${sidebarWidth}px` : 0,
                    width: '100%',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}