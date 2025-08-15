'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useState, Suspense } from 'react'
import api from '@/lib/axios'
import ResendOtp from "@/components/auth/ResendOtp";

function Otp(){
    const searchParams = useSearchParams()
    const router = useRouter()

    const phone = searchParams.get('phone')
    const nextStep = searchParams.get('next_step') // مهم‌ترین تغییر این خطه
    const [code, setCode] = useState('')
    const [error, setError] = useState('')

    const handleVerify = async () => {
        try {
            if (!phone || !nextStep) {
                setError('شماره یا مرحله بعدی نامشخص است.')
                return
            }

            const endpoint =
                nextStep === 'register' ? '/auth/otp/register/' :
                    nextStep === 'login' ? '/auth/otp/login/' :
                        null

            if (!endpoint) {
                setError('مرحله ورود نامعتبر است.')
                return
            }

            const response = await api.post(endpoint, {
                phone,
                code,
            })

            const { access, refresh, user } = response.data

            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            router.push('/')
        } catch (err: any) {
            setError(err?.response?.data?.detail || 'کد وارد شده نادرست است.')
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
            <ResendOtp phone={phone} delay={10} backend="sms" />
        </Box>
    )
}
export default function OtpVerifyPage() {
    return(
        <Suspense fallback={<Box>در حال بارگذاری...</Box>}>
            <Otp />
        </Suspense>
        )

}
