'use client'

import { useState, useEffect } from 'react'
import { Button, Typography } from '@mui/material'
import api from '@/lib/axios'

interface ResendOtpProps {
    phone: string | null
    delay?: number,
    backend?: 'sms' | 'email'
}

export default function ResendOtp({ phone, delay = 60, backend = 'sms' }: ResendOtpProps) {
    const [countdown, setCountdown] = useState(delay)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (countdown <= 0) return
        const timer = setInterval(() => setCountdown(prev => prev - 1), 1000)
        return () => clearInterval(timer)
    }, [countdown])

    const handleResend = async () => {
        setLoading(true)
        setError(null)
        try {
            await api.post('/auth/resend-otp/', {
                phone,
                backend
            })
            setCountdown(delay)
        } catch (err: any) {
            if (err.response?.status === 429) {
                setError('لطفاً چند ثانیه صبر کنید')
            } else {
                setError('خطا در ارسال مجدد کد')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {countdown > 0 ? (
                <Typography variant="body2" color="text.secondary">
                    ارسال مجدد کد تا {countdown} ثانیه دیگر
                </Typography>
            ) : (
                <Button onClick={handleResend} disabled={loading}>
                    ارسال مجدد کد
                </Button>
            )}
            {error && (
                <Typography variant="body2" color="error" mt={1}>
                    {error}
                </Typography>
            )}
        </>
    )
}
