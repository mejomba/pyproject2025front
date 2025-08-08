// components/layout/MobileNav.tsx
'use client'

import { BottomNavigation, BottomNavigationAction, Paper, useTheme, useMediaQuery } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article'
import CodeIcon from '@mui/icons-material/Code'
import ForumIcon from '@mui/icons-material/Forum'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const items = [
    { label: 'خانه', icon: <HomeIcon />, href: '/' },
    { label: 'مقالات', icon: <ArticleIcon />, href: '/articles' },
    { label: 'تمرین‌ها', icon: <CodeIcon />, href: '/exercises' },
    { label: 'پرسش‌وپاسخ', icon: <ForumIcon />, href: '/qa' },
]

export default function MobileNav() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const router = useRouter()
    const pathname = usePathname()
    const [value, setValue] = useState(0)

    useEffect(() => {
        const index = items.findIndex((item) => item.href === pathname)
        if (index !== -1) setValue(index)
    }, [pathname])

    if (!isMobile) return null

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, right: 0, left: 0, zIndex: 1200 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue)
                    router.push(items[newValue].href)
                }}
            >
                {items.map((item, index) => (
                    <BottomNavigationAction key={index} label={item.label} icon={item.icon} />
                ))}
            </BottomNavigation>
        </Paper>
    )
}
