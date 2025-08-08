// components/layout/Footer.tsx (Server Component)
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material'

const column1 = ['درباره ما', 'تماس با ما', 'همکاری با ما']
const column2 = ['راهنمای ثبت‌نام', 'سؤالات متداول', 'قوانین سایت']
const column3 = ['LinkedIn', 'GitHub', 'Telegram']

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4, mt: 6, borderTop: '1px solid #e0e0e0' }}>
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>PyProject2025</Typography>
                        {column1.map((item, index) => (
                            <MuiLink key={index} href="#" underline="hover" color="text.secondary" display="block" mb={0.5}>
                                {item}
                            </MuiLink>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>راهنما</Typography>
                        {column2.map((item, index) => (
                            <MuiLink key={index} href="#" underline="hover" color="text.secondary" display="block" mb={0.5}>
                                {item}
                            </MuiLink>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>ما را دنبال کنید</Typography>
                        {column3.map((item, index) => (
                            <MuiLink key={index} href="#" underline="hover" color="text.secondary" display="block" mb={0.5}>
                                {item}
                            </MuiLink>
                        ))}
                    </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} PyProject2025 - تمام حقوق محفوظ است
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}
