'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Typography } from '@mui/material';

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        // پاک کردن توکن‌ها
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')

        // هدایت به صفحه ورود یا خانه
        router.push('/')
    }, [router])

    return (
        <Box textAlign="center" mt={10}>
            <Typography variant="h5" fontWeight="bold">
                در حال خروج...
            </Typography>
        </Box>
    )
}
