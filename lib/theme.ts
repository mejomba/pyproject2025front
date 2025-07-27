import { createTheme } from '@mui/material/styles'
import { faIR } from '@mui/material/locale'

const theme = createTheme(
    {
        direction: 'rtl',
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
        palette: {
            mode: 'light',
        },
    },
    faIR
)

export default theme
