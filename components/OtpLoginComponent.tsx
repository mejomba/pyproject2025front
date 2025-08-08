// 'use client'
//
// import { useState } from 'react'
// import { sendOtp } from '@/lib/api/auth'
// import { Button, TextField, Typography, Alert } from '@mui/material'
//
// export default function OTPLoginPage({ phone }: { phone: string }) {
//     const [loading, setLoading] = useState(false)
//     const [success, setSuccess] = useState(false)
//     const [error, setError] = useState<string | null>(null)
//
//     const handleSend = async () => {
//         setLoading(true)
//         setError(null)
//
//         try {
//             await sendOtp(phone)
//             setSuccess(true)
//         } catch (err: any) {
//             setError(err?.response?.data?.detail || 'خطایی رخ داده است.')
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     return (
//         <div>
//             <Typography>کد تأیید برای شماره {phone} ارسال شود؟</Typography>
//             <Button variant="contained" onClick={handleSend} disabled={loading || success}>
//                 {loading ? 'در حال ارسال...' : success ? 'ارسال شد' : 'ارسال کد'}
//             </Button>
//
//             {error && <Alert severity="error">{error}</Alert>}
//         </div>
//     )
// }
