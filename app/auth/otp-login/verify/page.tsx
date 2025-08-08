'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useState } from 'react'
import api from '@/lib/axios'
import axios from "axios";

export default function OtpVerifyPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const phone = searchParams.get('phone')
    const [code, setCode] = useState('')
    const [error, setError] = useState('')

    const handleVerify = async () => {
        try {
            const response = await api.post(`/auth/otp/verify/`, {
                phone,
                code,
            })
            const { access, refresh, user } = response.data
            // ذخیره توکن‌ها در localStorage یا cookie
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            // انتقال به داشبورد یا صفحه اصلی
            router.push('/')
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || 'کد وارد شده نادرست است.')
            } else {
                setError('خطایی رخ داده است.')
            }
        }
    }

    return (
        <Box maxWidth={400} mx="auto" mt={10}>
            <Typography variant="h6" mb={2}>تأیید کد یکبار مصرف</Typography>
            <TextField
                fullWidth
                label="کد ارسالی"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button fullWidth variant="contained" color="primary" onClick={handleVerify}>
                تأیید
            </Button>
        </Box>
    )
}
