// components/layout/SidebarWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useMediaQuery, useTheme, Box } from '@mui/material'
import Sidebar from './Sidebar'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'pp25:sidebar:open' // 1=open, 0=closed

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isDashboard = pathname.startsWith('/dashboard')

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const [open, setOpen] = useState<boolean>(false)
    const sidebarWidth = 240

    // تک‌منبعِ حقیقت: localStorage (با کوکی کمکی)
    const persist = useCallback((val: boolean) => {
        try {
            localStorage.setItem(STORAGE_KEY, val ? '1' : '0')
            document.cookie = `sidebar_open=${val ? '1' : '0'}; Path=/; Max-Age=31536000`
        } catch {}
    }, [])

    // خواندن اولیه و واکنش به تغییر mobile/desktop
    useEffect(() => {
        let next = false
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved !== null) {
                next = saved === '1'
            } else {
                // پیش‌فرض: دسکتاپ باز، موبایل بسته
                next = !isMobile
            }
        } catch {
            next = !isMobile
        }
        setOpen(next)
        persist(next)
    }, [isMobile, persist])

    // همگام‌سازی بین تب‌ها
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue != null) {
                setOpen(e.newValue === '1')
            }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const handleToggle = useCallback(() => {
        setOpen(prev => {
            const next = !prev
            persist(next)
            return next
        })
    }, [persist])

    return (
        <Box sx={{ display: 'flex', transition: 'all 0.3s ease-in-out' }}>
            <Sidebar
                open={open}
                onToggle={handleToggle}
                width={sidebarWidth}
            />

            <Box
                sx={{
                    flexGrow: 1,
                    transition: 'margin-right 0.3s ease-in-out',
                    // در موبایل محتوا نباید جابه‌جا شود
                    marginRight: !isMobile && isDashboard && open ? `${sidebarWidth}px` : 0,
                    width: '100%',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}
