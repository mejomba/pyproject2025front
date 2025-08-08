'use client'

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useMemo } from 'react'

// تنظیم RTL برای Emotion
const createRtlCache = () =>
    createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    })

// می‌تونی darkMode رو هم از context بگیری
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const cache = useMemo(() => createRtlCache(), [])
    const theme = useMemo(
        () =>
            createTheme({
                direction: 'rtl',
                palette: {
                    mode: 'light', // یا "dark" از context
                    primary: { main: '#1976d2' },
                },
                typography: {
                    fontFamily: 'iranyekan, Roboto, sans-serif',
                },
            }),
        []
    )

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}
