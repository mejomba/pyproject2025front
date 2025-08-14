import { createTheme, ThemeOptions } from '@mui/material/styles'
import { faIR } from '@mui/material/locale'

export const getTheme = (mode: 'light' | 'dark'): ThemeOptions =>
    createTheme(
        {
            direction: 'rtl',
            palette: {
                mode,
                primary: {
                    main: '#6366F1',
                },
                secondary: {
                    main: '#06B6D4',
                },
                background: {
                    default: mode === 'light' ? '#F9FAFB' : '#1E293B',
                    paper: mode === 'light' ? '#FFFFFF' : '#273142',
                },
                text: {
                    primary: mode === 'light' ? '#111827' : '#F3F4F6',
                    secondary: mode === 'light' ? '#6B7280' : '#CBD5E1',
                },
                error: {
                    main: '#EF4444',
                },
                warning: {
                    main: '#FBBF24',
                },
            },
            typography: {
                fontFamily: 'Shabnam',
            },
            components: {
                MuiCssBaseline: {
                    styleOverrides: {
                        body: {
                            backgroundColor: mode === 'light' ? '#F9FAFB' : '#1E293B',
                        },
                    },
                },
            },
        },
        faIR
    )
