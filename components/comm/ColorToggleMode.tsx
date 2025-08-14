// components/common/ColorModeToggle.tsx
'use client'

// import * as React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorMode } from '@/components/ThemeRegistry';

export default function ColorModeToggle() {
    const { mode, toggleMode } = useColorMode();
    return (
        <Tooltip title={mode === 'dark' ? 'حالت روشن' : 'حالت تاریک'}>
            <IconButton onClick={toggleMode} size="small" aria-label="تغییر حالت روشن/تاریک">
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
}