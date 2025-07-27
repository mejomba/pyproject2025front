import MainLayout from '@/components/layout/MainLayout'
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <MainLayout>
      <Box>
        <Typography variant="h1" fontWeight="bold">صفحه اصلی</Typography>
      </Box>
    </MainLayout>
  )
}
