'use client'

import { Box, Typography, TextField, Button, Stack } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function OTPLoginPage() {
    const searchParams = useSearchParams()
    const phone = searchParams.get('phone') || ''

    const [otp, setOtp] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // ارسال درخواست به API برای تأیید کد OTP
        console.log({ phone, otp })
    }

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: 'auto',
                marginTop: 8,
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="h5" textAlign="center" gutterBottom>
                ورود با کد یک‌بار مصرف
            </Typography>

            <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                کد ۶ رقمی ارسال‌شده به شماره <strong>{phone}</strong> را وارد کنید.
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="کد تایید"
                        fullWidth
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        inputProps={{ maxLength: 6 }}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        تایید کد
                    </Button>

                    <Button variant="text" color="secondary" fullWidth disabled>
                        ارسال مجدد کد (۱:۵۹)
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
