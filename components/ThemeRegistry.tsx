'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { getTheme } from '@/lib/theme'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
    const [mode, setMode] = useState<'light' | 'dark'>(prefersDark ? 'dark' : 'light')

    useEffect(() => {
        setMode(prefersDark ? 'dark' : 'light')
    }, [prefersDark])

    const theme = useMemo(() => getTheme(mode), [mode])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
