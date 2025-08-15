'use client'

import { useEffect, useState } from 'react'
import {passwordLoginOrSignup, phoneCheck, saveTokens, sendOtp} from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import { Box, TextField, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material'

export default function LoginPage() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [method, setMethod] = useState<'password' | 'otp'>('otp')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        setLoading(true)
        setError('')
        try {
            const result = await phoneCheck(phone, method)
            console.log(result)
            const next_step = result.next_step
            if (method === 'otp'){
                await sendOtp(phone)
                router.push(`/auth/otp/verify?phone=${phone}&next_step=${next_step}`)
            } else if (method === 'password') {
                const res = await passwordLoginOrSignup(phone, password)
                saveTokens(res)  // res = response.data
                router.push('/') // یا هر مسیر مناسب
            }

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mx="auto" mt={8}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">ورود به سامانه</Typography>

            <TextField
                label="شماره تلفن"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
            />

            <RadioGroup row value={method} onChange={(e) => setMethod(e.target.value as 'password' | 'otp')}>
                <FormControlLabel value="password" control={<Radio />} label="رمز عبور" />
                <FormControlLabel value="otp" control={<Radio />} label="رمز یک‌بار مصرف" />
            </RadioGroup>

            {error && <Typography color="error">{error}</Typography>}

            {method === 'password' && (
                <TextField
                    label="رمز عبور"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
            )}

            <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                {loading ? 'در حال ارسال...' : 'ادامه'}
            </Button>
        </Box>
    )
}
