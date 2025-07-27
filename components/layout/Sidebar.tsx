import React from 'react';
import { Box, Typography } from '@mui/material';

const Sidebar = () => {
    return (
        <Box
            component="aside"
            width="240px"
            bgcolor="grey.200"
            borderRight="1px solid #ccc"
            height="100%"
            p={2}
        >
            <Typography variant="body1">Sidebar</Typography>
        </Box>
    );
};

export default Sidebar;
