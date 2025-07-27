'use client'

import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import createEmotionCache from '@/lib/emotion-cache'
import theme from '@/lib/theme'

const emotionCache = createEmotionCache()

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}

