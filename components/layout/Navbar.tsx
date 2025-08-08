// components/layout/Navbar.tsx (Server Component)
import Link from 'next/link'
import { Box, Container, Typography, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const navItems = [
    { label: 'دوره‌ها', href: '/courses' },
    { label: 'مقالات', href: '/articles' },
    { label: 'تمرین‌ها', href: '/exercises' },
    { label: 'پرسش و پاسخ', href: '/qa' },
]

export default function Navbar() {
    return (
        <Box sx={{ width: '100%', borderBottom: '1px solid #e0e0e0', bgcolor: 'background.paper' }}>
            <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                {/* Right: Logo */}
                <Box>
                    <Link href="/">
                        <Typography variant="h6" fontWeight="bold" color="primary">PyProject2025</Typography>
                    </Link>
                </Box>

                {/* Center: Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Typography variant="body1" color="text.primary">{item.label}</Typography>
                        </Link>
                    ))}
                </Box>

                {/* Left: Search */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f1f1f1', px: 1, borderRadius: 1, width: { xs: '40%', md: '25%' } }}>
                    <SearchIcon fontSize="small" color="action" />
                    <InputBase placeholder="جستجو..." sx={{ flex: 1, fontSize: '0.9rem' }} />
                </Box>
            </Container>
        </Box>
    )
}
