import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            width="100%"
            bgcolor="grey.100"
            py={2}
            textAlign="center"
        >
            <Typography variant="body2" color="textSecondary">
                Footer
            </Typography>
        </Box>
    );
};

export default Footer;
