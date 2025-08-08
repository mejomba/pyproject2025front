import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Box } from '@mui/material';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* begin header section */}
            <Header />
            {/* end header section */}

            {/* begin page content */}
            <Box display="flex" flex="1">

                {/* begin right sidebar */}
                <Box width="240px">
                    <Sidebar />
                </Box>
                {/* end right sidebar */}

                {/* begin main content */}
                <Box component="main" flex="1" p={3}>
                    {children}
                </Box>
                {/* end main content */}

            </Box>
            {/* end page content */}

            <Footer />
        </Box>
    );
}
