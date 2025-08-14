'use client'

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import {getTheme} from "@/lib/theme";

// تنظیم RTL برای Emotion
const createRtlCache = () =>
    createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    })

// ---- Color mode context
export type Mode = 'light' | 'dark';
interface ColorModeCtxValue {
    mode: Mode;
    setMode: (m: Mode) => void;
    toggleMode: () => void;
}

const ColorModeContext = createContext<ColorModeCtxValue | undefined>(undefined);
export const useColorMode = () => {
    const ctx = useContext(ColorModeContext);
    if (!ctx) throw new Error('useColorMode must be used within <ThemeRegistry>');
    return ctx;
};

// می‌تونی darkMode رو هم از context بگیری
export default function ThemeRegistry({ children, initialMode = 'light' }: { children: React.ReactNode; initialMode?: Mode }) {
    const [mode, setMode] = useState<Mode>(initialMode);
    const cache = useMemo(() => createRtlCache(), [])
    const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);
    const value = useMemo<ColorModeCtxValue>(() => ({ mode, setMode, toggleMode: () => setMode(m => (m === 'light' ? 'dark' : 'light')) }), [mode]);

    // Hydrate from localStorage once on mount (client)
    useEffect(() => {
        const saved = typeof window !== 'undefined' ? (localStorage.getItem('color-mode') as Mode | null) : null;
        if (saved && saved !== mode) setMode(saved);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Persist changes to localStorage + cookie (for SSR initial read)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('color-mode', mode);
            document.cookie = `color-mode=${mode}; Path=/; Max-Age=31536000`;
        }
    }, [mode]);

    return (
        <CacheProvider value={cache}>
            <ColorModeContext.Provider value={value}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </CacheProvider>
    )
}
