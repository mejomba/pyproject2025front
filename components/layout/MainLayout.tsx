import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Box } from '@mui/material';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />

            <Box display="flex" flex="1">
                <Box component="main" flex="1" p={3}>
                    {children}
                </Box>

                <Box width="240px">
                    <Sidebar />
                </Box>
            </Box>

            <Footer />
        </Box>
    );
}
