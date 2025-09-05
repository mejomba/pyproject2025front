// components/layout/Navbar.tsx (Server Component)
import Link from 'next/link'
import {Box, Container, InputBase, Typography} from '@mui/material'
import ColorModeToggle from "@/components/comm/ColorToggleMode";
import SearchIcon from "@mui/icons-material/Search";
// import Image from "next/image";
// import logoHorizontalTransparent from "@/images/logos/logo_horizontal_transparent.svg";
// import darkLogoHorizontalTransparent from "@/images/logos/dark_logo_horizontal_transparent.svg";
// import logoTransparent from "@/images/logos/logo_transparent.svg";
import {LogoHorizontalTransparent, LogoTransparent} from "@/components/comm/Logo"


const navItems = [
    { label: 'دوره‌ها', href: '/courses' },
    { label: 'مقالات', href: '/blog/list' },
    { label: 'تمرین‌ها', href: '/exercises' },
    { label: 'پرسش و پاسخ', href: '/qa' },
]

export default function Navbar() {
    return (
        <Box sx={{ width: '100%', borderBottom: '1px solid #e0e0e0', bgcolor: 'background.paper' }}>
            <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                {/* Right: Logo */}
                <LogoHorizontalTransparent />

                {/* Center: Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} style={{ textDecoration: "none" }} >
                            <Typography variant="h6" color="text.primary"  className="font-300">{item.label}</Typography>
                        </Link>
                    ))}
                </Box>

                {/* Left: Search */}
                <Box  sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, borderRadius: 1, border: '1px solid',
                    borderColor: 'divider', width: { xs: '40%', md: '25%' } }}>
                    <SearchIcon fontSize="small" color="action" />
                    <InputBase placeholder="جستجو..." sx={{ flex: 1, fontSize: '0.9rem'}} />
                </Box>
                <ColorModeToggle />
            </Container>
        </Box>
    )
}
